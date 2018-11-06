import { Type } from 'gql'
import hashPassword from 'utils/hashPassword'
import updatePeerByPidAndUserId from 'api/dal/Peer/updatePeerByPidAndUserId'
import createStory from 'api/dal/Story/createStory'
import deleteStoryById from 'api/dal/Story/deleteStoryById'
import getStoryById from 'api/dal/Story/getStoryById'
import getStoryByPid from 'api/dal/Story/getStoryByPid'
import unpublishStoryByPid from 'api/dal/Story/unpublishStoryByPid'
import createStoryDraft from 'api/dal/StoryDraft/createStoryDraft'
import getStoryDraftById from 'api/dal/StoryDraft/getStoryDraftById'
import publishStoryDraftByPid from 'api/dal/StoryDraft/publishStoryDraftByPid'
import updateStoryDraftByPid from 'api/dal/StoryDraft/updateStoryDraftByPid'
import updateTeamMemberByPidAndUserId from 'api/dal/TeamMember/updateTeamMemberByPidAndUserId'
import getUserById from 'api/dal/User/getUserById'
import updateUserAvatarById from 'api/dal/User/updateUserAvatarById'
import updateUserPasswordById from 'api/dal/User/updateUserPasswordById'
import { forbiddenError, throwForbidden } from 'api/errors/ForbiddenError'
import { notFoundError, throwNotFound } from 'api/errors/NotFoundError'
import mapPeer from 'api/mappers/mapPeer'
import mapStory from 'api/mappers/mapStory'
import mapStoryDraft from 'api/mappers/mapStoryDraft'
import mapTeamMember from 'api/mappers/mapTeamMember'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import PeerUpdateUpdate from 'api/types/PeerUpdateUpdate'
import Pid from 'api/types/Pid'
import paymentUpdate from 'api/resolvers/mutations/paymentUpdate'
import paymentPublish from 'api/resolvers/mutations/paymentPublish'
import PeerType from './PeerType'
import PeerUpdateUpdateInput from './PeerUpdateUpdateInput'
import StoryType from './StoryType'
import StoryDraftType from './StoryDraftType'
import TeamMemberRoleType from './TeamMemberRoleType'
import TeamMemberType from './TeamMemberType'
import onboarding from './onboarding'
import UserType from './UserType'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    ...paymentUpdate(field),
    ...paymentPublish(field),
    meChangeAvatar: field
      .ofType(UserType)
      .args(arg => ({
        avatar: arg.ofJson().nullable(),
      }))
      .resolve(
        createPrivateResolver('meChangeAvatar', async ({ args, scope }) => {
          const userId = await updateUserAvatarById(
            { id: scope.user.id, avatar: args.avatar },
            scope
          )

          if (!userId) {
            throw forbiddenError()
          }

          const user = await getUserById({ id: userId }, scope)

          return mapUser(user)
        })
      ),
    meChangePassword: field
      .ofType(UserType)
      .args(arg => ({
        password: arg.ofString(),
      }))
      .resolve(
        createPrivateResolver('meChangePassword', async ({ args, scope }) => {
          const user = await getUserById({ id: scope.user.id }, scope)

          if (!user) {
            throw notFoundError()
          }

          const hash = await hashPassword(args.password)

          await updateUserPasswordById({ id: scope.user.id, hash }, scope)

          return mapUser(user)
        })
      ),
    teamMemberUpdateRole: field
      .ofType(TeamMemberType)
      .args(arg => ({
        pid: arg.ofId(),
        role: arg.ofType(TeamMemberRoleType),
      }))
      .resolve(
        createPrivateResolver(
          'teamMemberUpdateRole',
          async ({ args, scope }) => {
            const member = await updateTeamMemberByPidAndUserId(
              { userId: scope.user.id, pid: args.pid, role: args.role },
              scope
            )

            if (!member) {
              return undefined
            }

            const user = await getUserById({ id: member.userId }, scope)

            return mapTeamMember({ member, user, currentUserId: scope.user.id })
          }
        )
      ),
    peerUpdate: field
      .ofType(PeerType)
      .args(arg => ({
        pid: arg.ofId(),
        update: arg.ofType(PeerUpdateUpdateInput),
      }))
      .resolve(
        createPrivateResolver('peerUpdate', async ({ args, scope }) => {
          const pid: Pid = args.pid
          const update: PeerUpdateUpdate = args.update

          const peer = await updatePeerByPidAndUserId(
            {
              userId: scope.user.id,
              pid: Number(pid),
              name: update.name,
            },
            scope
          )

          return peer && mapPeer(peer)
        })
      ),
    storyCreate: field
      .ofType(StoryType)
      .args(arg => ({
        accountPid: arg.ofId(),
        title: arg.ofString().nullable(),
        cover: arg.ofJson().nullable(),
        body: arg.ofJson().nullable(),
        paymentPids: arg.listOfId().nullable(),
      }))
      .resolve(
        createPrivateResolver('storyCreate', async ({ args, scope }) => {
          const userId = scope.user.id

          const storyId = await createStory(
            { userId, accountPid: args.accountPid },
            scope
          )

          if (!storyId) {
            return throwForbidden()
          }

          const draftId = await createStoryDraft(
            {
              userId,
              storyId,
              title: args.title,
              cover: args.cover,
              body: args.body,
              paymentPids: args.paymentPids,
            },
            scope
          )

          if (!draftId) {
            return throwForbidden()
          }

          const story = await getStoryById({ userId, id: storyId }, scope)

          if (!story) {
            return throwForbidden()
          }

          return mapStory(story)
        })
      ),
    storyUnpublish: field
      .ofType(StoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver('storyUnpublish', async ({ args, scope }) => {
          const userId = scope.user.id

          const storyId = await unpublishStoryByPid(
            { userId, pid: args.pid },
            scope
          )

          if (!storyId) {
            return throwNotFound()
          }

          const story = await getStoryById({ userId, id: storyId }, scope)

          if (!story) {
            return throwNotFound()
          }

          return mapStory(story)
        })
      ),
    storyDelete: field
      .ofType(StoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver('storyDelete', async ({ args, scope }) => {
          const userId = scope.user.id

          const story = await getStoryByPid({ userId, pid: args.pid }, scope)

          if (!story) {
            return throwNotFound()
          }

          await deleteStoryById({ userId, id: story.id }, scope)

          return mapStory(story)
        })
      ),
    storyDraftUpdate: field
      .ofType(StoryDraftType)
      .args(arg => ({
        pid: arg.ofId(),
        title: arg.ofString().nullable(),
        cover: arg.ofJson().nullable(),
        body: arg.ofJson().nullable(),
        paymentPids: arg.listOfId().nullable(),
      }))
      .resolve(
        createPrivateResolver('storyDraftUpdate', async ({ args, scope }) => {
          const userId = scope.user.id

          const draftId = await updateStoryDraftByPid(
            {
              userId,
              pid: args.pid,
              title: args.title,
              cover: args.cover,
              body: args.body,
              paymentPids: args.paymentPids,
            },
            scope
          )

          if (!draftId) {
            return throwNotFound()
          }

          const draft = await getStoryDraftById({ id: draftId }, scope)

          if (!draft) {
            return throwNotFound()
          }

          return mapStoryDraft(draft)
        })
      ),
    storyDraftPublish: field
      .ofType(StoryDraftType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver('storyDraftPublish', async ({ args, scope }) => {
          const userId = scope.user.id

          const draftId = await publishStoryDraftByPid(
            { userId, pid: args.pid },
            scope
          )

          if (!draftId) {
            return throwNotFound()
          }

          const draft = await getStoryDraftById({ id: draftId }, scope)

          if (!draft) {
            return throwNotFound()
          }

          return mapStoryDraft(draft)
        })
      ),
  }))
)

export default MutationType
