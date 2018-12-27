import { isNil } from 'ramda'
import storyPublicationNotification from '@frankmoney/frank-mail/storyPublicationNotification'
import { Type } from 'gql'
import { TeamMemberRole, UserType as UserTypeEnum } from 'store/enums'
import hashPassword from 'utils/hashPassword'
import getAccount from 'api/dal/Account/getAccount'
import updateAccount from 'api/dal/Account/updateAccount'
import createCategory from 'api/dal/Category/createCategory'
import deleteCategory from 'api/dal/Category/deleteCategory'
import getCategory from 'api/dal/Category/getCategory'
import updateCategory from 'api/dal/Category/updateCategory'
import countPayments from 'api/dal/Payment/countPayments'
import updatePeerByPidAndUserId from 'api/dal/Peer/updatePeerByPidAndUserId'
import createStory from 'api/dal/Story/createStory'
import deleteStoryById from 'api/dal/Story/deleteStoryById'
import getStory from 'api/dal/Story/getStory'
import unpublishStoryByPid from 'api/dal/Story/unpublishStoryByPid'
import createStoryDraft from 'api/dal/StoryDraft/createStoryDraft'
import getStoryDraftById from 'api/dal/StoryDraft/getStoryDraftById'
import publishStoryDraftByPid from 'api/dal/StoryDraft/publishStoryDraftByPid'
import updateStoryDraftByPid from 'api/dal/StoryDraft/updateStoryDraftByPid'
import updateTeamMemberByPidAndUserId from 'api/dal/TeamMember/updateTeamMemberByPidAndUserId'
import getUser from 'api/dal/User/getUser'
import listUsers from 'api/dal/User/listUsers'
import updateUserAvatarById from 'api/dal/User/updateUserAvatarById'
import updateUserPasswordById from 'api/dal/User/updateUserPasswordById'
import { forbiddenError, throwForbidden } from 'api/errors/ForbiddenError'
import { notFoundError, throwNotFound } from 'api/errors/NotFoundError'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPeer from 'api/mappers/mapPeer'
import mapStory from 'api/mappers/mapStory'
import mapStoryDraft from 'api/mappers/mapStoryDraft'
import mapTeamMember from 'api/mappers/mapTeamMember'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountUpdateUpdate from 'api/types/AccountUpdateUpdate'
import CategoryDeleteResult from 'api/types/CategoryDeleteResult'
import CategoryUpdateUpdate from 'api/types/CategoryUpdateUpdate'
import PeerUpdateUpdate from 'api/types/PeerUpdateUpdate'
import Pid from 'api/types/Pid'
import paymentUpdate from 'api/resolvers/mutations/paymentUpdate'
import AccountType from './AccountType'
import AccountUpdateUpdateInput from './AccountUpdateUpdateInput'
import CategoryDeleteType from './CategoryDeleteType'
import CategoryType from './CategoryType'
import CategoryTypeType from './CategoryTypeType'
import CategoryUpdateUpdateInput from './CategoryUpdateUpdateInput'
import PeerType from './PeerType'
import PeerUpdateUpdateInput from './PeerUpdateUpdateInput'
import StoryType from './StoryType'
import StoryDraftType from './StoryDraftType'
import TeamMemberRoleType from './TeamMemberRoleType'
import TeamMemberType from './TeamMemberType'
import UserType from './UserType'
import onboarding from './onboarding'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    ...paymentUpdate(field),
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

          const user = await getUser(
            { where: { id: { eq: scope.user.id } } },
            scope
          )

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
          const user = await getUser(
            { where: { id: { eq: scope.user.id } } },
            scope
          )

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

            const user = await getUser(
              {
                where: {
                  teamMembers: {
                    any: {
                      team: {
                        members: {
                          any: {
                            user: { id: { eq: scope.user.id } },
                            and: {
                              or: [
                                { roleId: { eq: TeamMemberRole.manager } },
                                {
                                  roleId: { eq: TeamMemberRole.administrator },
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                  id: { eq: member.userId },
                },
              },
              scope
            )

            return mapTeamMember({ member, user, currentUserId: scope.user.id })
          }
        )
      ),
    accountUpdate: field
      .ofType(AccountType)
      .args(arg => ({
        pid: arg.ofId(),
        update: arg.ofType(AccountUpdateUpdateInput),
      }))
      .resolve(
        createPrivateResolver('accountUpdate', async ({ args, scope }) => {
          const userId = scope.user.id
          const update: AccountUpdateUpdate = args.update

          const accountId = await updateAccount(
            {
              userId,
              update: {
                name: update.name ? update.name! : undefined,
                description: isNil(update.description)
                  ? undefined
                  : update.description.trim() || null,
                public: isNil(update.public) ? undefined : update.public!,
              },
              where: {
                pid: { eq: args.pid },
                team: {
                  members: {
                    any: {
                      user: { id: { eq: userId } },
                      and: {
                        or: [
                          { roleId: { eq: TeamMemberRole.manager } },
                          { roleId: { eq: TeamMemberRole.administrator } },
                        ],
                      },
                    },
                  },
                },
              },
            },
            scope
          )

          if (!accountId) {
            throw notFoundError()
          }

          const account = await getAccount(
            { userId, where: { id: { eq: accountId } } },
            scope
          )

          return mapAccount(account)
        })
      ),
    categoryCreate: field
      .ofType(CategoryType)
      .args(arg => ({
        accountPid: arg.ofId(),
        type: arg.ofType(CategoryTypeType),
        name: arg.ofString(),
        color: arg.ofString(),
      }))
      .resolve(
        createPrivateResolver('categoryCreate', async ({ args, scope }) => {
          const userId = scope.user.id

          const account = await getAccount(
            {
              userId,
              where: {
                pid: { eq: args.accountPid },
                team: {
                  members: {
                    any: {
                      user: { id: { eq: userId } },
                      and: {
                        or: [
                          { roleId: { eq: TeamMemberRole.manager } },
                          { roleId: { eq: TeamMemberRole.administrator } },
                        ],
                      },
                    },
                  },
                },
              },
            },
            scope
          )

          if (!account) {
            throw notFoundError()
          }

          const categoryId = await createCategory(
            {
              userId,
              accountId: account.id,
              type: args.type,
              name: args.name,
              color: args.color,
            },
            scope
          )

          if (!categoryId) {
            throw notFoundError()
          }

          const category = await getCategory(
            { where: { id: { eq: categoryId } } },
            scope
          )

          return mapCategory(category)
        })
      ),
    categoryDelete: field
      .ofType(CategoryDeleteType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver('categoryDelete', async ({ args, scope }) => {
          const userId = scope.user.id

          const category = await getCategory(
            {
              where: {
                pid: { eq: args.pid },
                account: {
                  team: {
                    members: {
                      any: {
                        user: { id: { eq: userId } },
                        and: {
                          or: [
                            { roleId: { eq: TeamMemberRole.manager } },
                            { roleId: { eq: TeamMemberRole.administrator } },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            scope
          )

          if (!category) {
            throw notFoundError()
          }

          const paymentCount = await countPayments(
            { where: { category: { id: { eq: category.id } } } },
            scope
          )

          let result: CategoryDeleteResult

          if (paymentCount === 0) {
            await deleteCategory(
              {
                userId,
                where: { id: { eq: category.id } },
              },
              scope
            )

            result = CategoryDeleteResult.success
          } else {
            result = CategoryDeleteResult.hasPayments
          }

          const account = await getAccount(
            { userId, where: { id: { eq: category.accountId } } },
            scope
          )

          return {
            result,
            account: mapAccount(account),
          }
        })
      ),
    categoryUpdate: field
      .ofType(CategoryType)
      .args(arg => ({
        pid: arg.ofId(),
        update: arg.ofType(CategoryUpdateUpdateInput),
      }))
      .resolve(
        createPrivateResolver('categoryUpdate', async ({ args, scope }) => {
          const userId = scope.user.id
          const update: CategoryUpdateUpdate = args.update

          const categoryId = await updateCategory(
            {
              userId,
              update: {
                name: update.name ? update.name! : undefined,
                color: update.color ? update.color! : undefined,
              },
              where: {
                pid: { eq: args.pid },
                account: {
                  team: {
                    members: {
                      any: {
                        user: { id: { eq: userId } },
                        and: {
                          or: [
                            { roleId: { eq: TeamMemberRole.manager } },
                            { roleId: { eq: TeamMemberRole.administrator } },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            scope
          )

          if (!categoryId) {
            throw notFoundError()
          }

          const category = await getCategory(
            { where: { id: { eq: categoryId } } },
            scope
          )

          return mapCategory(category)
        })
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

          const story = await getStory(
            {
              where: {
                account: {
                  team: {
                    members: {
                      any: {
                        user: { id: { eq: userId } },
                        and: {
                          or: [
                            { roleId: { eq: TeamMemberRole.manager } },
                            { roleId: { eq: TeamMemberRole.administrator } },
                          ],
                        },
                      },
                    },
                  },
                },
                id: { eq: storyId },
              },
            },
            scope
          )

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

          const story = await getStory(
            {
              where: {
                account: {
                  team: {
                    members: {
                      any: {
                        user: { id: { eq: userId } },
                        and: {
                          or: [
                            { roleId: { eq: TeamMemberRole.manager } },
                            { roleId: { eq: TeamMemberRole.administrator } },
                          ],
                        },
                      },
                    },
                  },
                },
                id: { eq: storyId },
              },
            },
            scope
          )

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

          const story = await getStory(
            {
              where: {
                account: {
                  team: {
                    members: {
                      any: {
                        user: { id: { eq: userId } },
                        and: {
                          or: [
                            { roleId: { eq: TeamMemberRole.manager } },
                            { roleId: { eq: TeamMemberRole.administrator } },
                          ],
                        },
                      },
                    },
                  },
                },
                pid: { eq: args.pid },
              },
            },
            scope
          )

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
        createPrivateResolver(
          'storyDraftPublish',
          async ({ log, args, scope }) => {
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

            const story = await getStory(
              { where: { id: { eq: draft.storyId } } },
              scope
            )

            const creator = await getUser(
              { where: { id: { eq: userId } } },
              scope
            )

            const account = await getAccount(
              { where: { id: { eq: story.accountId } }, userId },
              scope
            )

            const users = await listUsers(
              {
                where: {
                  typeId: { eq: UserTypeEnum.person },
                  teamMembers: {
                    any: {
                      team: {
                        accounts: {
                          any: {
                            id: {
                              eq: story.accountId,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              scope
            )

            await scope.uow.commit()

            await Promise.all(
              users.map(async user => {
                try {
                  const mail = storyPublicationNotification({
                    data: {
                      user,
                      creator,
                      account,
                      story: {
                        imageUrl: story.cover.thumbs.sized,
                        title: story.title!,
                        description: story.body.text,
                        link: scope.config.MAIL.links.storyPublicationNotification(
                          {
                            storyPid: story.pid,
                          }
                        ),
                      },
                    },
                  })

                  await scope.mailer.send({ to: user.email }, mail)

                  log.debug(
                    `Sent story publication notification mail to ${user.email}`
                  )
                } catch (exc) {
                  log.error(
                    exc,
                    `Failed to send story publication notification mail to ${
                      user.email
                    }`
                  )
                }
              })
            )

            return mapStoryDraft(draft)
          }
        )
      ),
  }))
)

export default MutationType
