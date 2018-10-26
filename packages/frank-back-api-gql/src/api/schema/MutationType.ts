import { Type } from 'gql'
import updatePeerByPidAndUserId from 'api/dal/Peer/updatePeerByPidAndUserId'
import createStory from 'api/dal/Story/createStory'
import getStoryById from 'api/dal/Story/getStoryById'
import createStoryDraft from 'api/dal/StoryDraft/createStoryDraft'
import getStoryDraftById from 'api/dal/StoryDraft/getStoryDraftById'
import publishStoryDraftByPid from 'api/dal/StoryDraft/publishStoryDraftByPid'
import updateStoryDraftByPid from 'api/dal/StoryDraft/updateStoryDraftByPid'
import updateTeamMemberByPidAndUserId from 'api/dal/TeamMember/updateTeamMemberByPidAndUserId'
import getUserById from 'api/dal/User/getUserById'
import { throwForbidden } from 'api/errors/ForbiddenError'
import { throwNotFound } from 'api/errors/NotFoundError'
import mapPeer from 'api/mappers/mapPeer'
import mapStory from 'api/mappers/mapStory'
import mapStoryDraft from 'api/mappers/mapStoryDraft'
import mapTeamMember from 'api/mappers/mapTeamMember'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import PeerUpdateUpdate from 'api/types/PeerUpdateUpdate'
import Pid from 'api/types/Pid'
import PeerType from './PeerType'
import PeerUpdateUpdateInput from './PeerUpdateUpdateInput'
import StoryType from './StoryType'
import StoryDraftType from './StoryDraftType'
import TeamMemberRoleType from './TeamMemberRoleType'
import TeamMemberType from './TeamMemberType'
import onboarding from './onboarding'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
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
    ...onboarding(field),
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
        createPrivateResolver(
          'storyCreate',
          async ({ args, scope }) => {
            const userId = scope.user.id

            const storyId = await createStory(
              { userId, accountPid: args.accountPid },
              scope
            )

            if (!storyId) {
              throwForbidden()
            }

            const draftId = await createStoryDraft(
              {
                userId,
                storyId: storyId!,
                title: args.title,
                cover: args.cover,
                body: args.body,
                paymentPids: args.paymentPids,
              },
              scope
            )

            if (!draftId) {
              throwForbidden()
            }

            const story = await getStoryById(
              { id: storyId! },
              scope
            )

            if (!story) {
              throwForbidden()
            }

            return mapStory(story)
          }
        )
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
        createPrivateResolver(
          'storyDraftUpdate',
          async ({ args, scope }) => {
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
              throwNotFound()
            }

            const draft = await getStoryDraftById(
              { id: draftId! },
              scope
            )

            if (!draft) {
              throwNotFound()
            }

            return mapStoryDraft(draft!)
          }
        )
      ),
    storyDraftPublish: field
      .ofType(StoryDraftType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'storyDraftPublish',
          async ({ args, scope }) => {
            const userId = scope.user.id

            const draftId = await publishStoryDraftByPid(
              { userId, pid: args.pid },
              scope
            )

            if (!draftId) {
              throwNotFound()
            }

            const draft = await getStoryDraftById(
              { id: draftId! },
              scope
            )

            if (!draft) {
              throwNotFound()
            }

            return mapStoryDraft(draft!)
          }
        )
      ),
  }))
)

export default MutationType
