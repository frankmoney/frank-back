import { isNil } from 'ramda'
import storyPublicationNotification from '@frankmoney/frank-mail/storyPublicationNotification'
import teamMemberInviteLetter from '@frankmoney/frank-mail/teamMemberInvite'
import { Type } from 'gql'
import { sql } from 'sql'
import { TeamMemberRole, UserType as UserTypeEnum } from 'store/enums'
import hashPassword from 'utils/hashPassword'
import getAccount from 'api/dal/Account/getAccount'
import updateAccount from 'api/dal/Account/updateAccount'
import createCategory from 'api/dal/Category/createCategory'
import deleteCategory from 'api/dal/Category/deleteCategory'
import getCategory from 'api/dal/Category/getCategory'
import updateCategory from 'api/dal/Category/updateCategory'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import countPayments from 'api/dal/Payment/countPayments'
import listPayments from 'api/dal/Payment/listPayments'
import updatePeerByPidAndUserId from 'api/dal/Peer/updatePeerByPidAndUserId'
import createStory from 'api/dal/Story/createStory'
import deleteStory from 'api/dal/Story/deleteStory'
import getStory from 'api/dal/Story/getStory'
import updateStory, { Args as UpdateStoryArgs } from 'api/dal/Story/updateStory'
import deleteStoryPayments from 'api/dal/StoryPayment/deleteStoryPayments'
import mergeStoryPayments from 'api/dal/StoryPayment/mergeStoryPayments'
import getTeam from 'api/dal/Team/getTeam'
import updateTeam from 'api/dal/Team/updateTeam'
import countTeamMembers from 'api/dal/TeamMember/countTeamMembers'
import createTeamMember from 'api/dal/TeamMember/createTeamMember'
import deleteTeamMember from 'api/dal/TeamMember/deleteTeamMember'
import updateTeamMemberByPidAndUserId from 'api/dal/TeamMember/updateTeamMemberByPidAndUserId'
import createTeamMemberInvite from 'api/dal/TeamMemberInvite/createTeamMemberInvite'
import updateTeamMemberInvite from 'api/dal/TeamMemberInvite/updateTeamMemberInvite'
import getTeamMemberInvite from 'api/dal/TeamMemberInvite/getTeamMemberInvite'
import getUser from 'api/dal/User/getUser'
import listUsers from 'api/dal/User/listUsers'
import updateUserAvatarById from 'api/dal/User/updateUserAvatarById'
import updateUserPasswordById from 'api/dal/User/updateUserPasswordById'
import { argumentError } from 'api/errors/ArgumentError'
import { forbiddenError } from 'api/errors/ForbiddenError'
import { notFoundError, throwNotFound } from 'api/errors/NotFoundError'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPeer from 'api/mappers/mapPeer'
import mapStory from 'api/mappers/mapStory'
import mapTeam from 'api/mappers/mapTeam'
import mapTeamMember from 'api/mappers/mapTeamMember'
import mapTeamMemberInvite from 'api/mappers/mapTeamMemberInvite'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountUpdateUpdate from 'api/types/AccountUpdateUpdate'
import CategoryDeleteResult from 'api/types/CategoryDeleteResult'
import CategoryUpdateUpdate from 'api/types/CategoryUpdateUpdate'
import PeerUpdateUpdate from 'api/types/PeerUpdateUpdate'
import Pid from 'api/types/Pid'
import StoryUpdateUpdate from 'api/types/StoryUpdateUpdate'
import paymentsUpdate from 'api/resolvers/mutations/paymentsUpdate'
import sourceUpdate from 'api/resolvers/mutations/sourceUpdate'
import TeamMemberInviteMaybeAcceptResultCode from 'api/types/TeamMemberInviteMaybeAcceptResultCode'
import AccountType from './AccountType'
import AccountUpdateUpdateInput from './AccountUpdateUpdateInput'
import CategoryDeleteType from './CategoryDeleteType'
import CategoryType from './CategoryType'
import CategoryTypeType from './CategoryTypeType'
import CategoryUpdateUpdateInput from './CategoryUpdateUpdateInput'
import PeerType from './PeerType'
import PeerUpdateUpdateInput from './PeerUpdateUpdateInput'
import StoryDeleteType from './StoryDeleteType'
import StoryType from './StoryType'
import StoryUpdateUpdateInput from './StoryUpdateUpdateInput'
import TeamMemberInviteAcceptResultType from './TeamMemberInviteAcceptResultType'
import TeamMemberInviteMaybeAcceptResultType from './TeamMemberInviteMaybeAcceptResultType'
import TeamMemberInviteType from './TeamMemberInviteType'
import TeamMemberRoleType from './TeamMemberRoleType'
import TeamMemberType from './TeamMemberType'
import TeamType from './TeamType'
import UserType from './UserType'
import onboarding from './onboarding'
import mapBodyToPlainShortText from 'api/dal/Story/helpers/mapBodyToPlainShortText'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    ...onboarding(field),
    ...paymentsUpdate(field),
    ...sourceUpdate(field),
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
    meChangeTeamName: field
      .ofType(TeamType)
      .args(arg => ({
        name: arg.ofString(),
      }))
      .resolve(
        createPrivateResolver('meChangeTeamName', async ({ args, scope }) => {
          const userId = scope.user.id

          const teamId = await updateTeam(
            {
              updaterId: userId,
              update: {
                name: args.name,
              },
              where: {
                members: {
                  any: {
                    user: {
                      id: { eq: userId },
                    },
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
            scope
          )

          if (!teamId) {
            throw forbiddenError()
          }

          const team = await getTeam({ where: { id: { eq: teamId } } }, scope)

          if (!team) {
            throw notFoundError()
          }

          return mapTeam(team)
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
    teamMemberInviteCreate: field
      .ofType(TeamMemberInviteType)
      .args(arg => ({
        teamPid: arg.ofId(),
        email: arg.ofString(),
        note: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'teamMemberInviteCreate',
          async ({ log, args, scope }) => {
            const userId = scope.user.id

            const team = await getTeam(
              {
                where: {
                  pid: { eq: args.teamPid },
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
              scope
            )

            if (!team) {
              throw notFoundError()
            }

            const inviteId = await createTeamMemberInvite(
              {
                creatorId: userId,
                email: args.email.trim(),
                note: (args.note && args.note.trim()) || null,
                teamId: team.id,
                roleId: TeamMemberRole.manager,
              },
              scope
            )

            const invite = await getTeamMemberInvite(
              { where: { id: { eq: inviteId } } },
              scope
            )

            if (!invite) {
              throw notFoundError()
            }

            const creator = await getUser(
              { where: { id: { eq: userId } } },
              scope
            )

            await scope.uow.commit()

            try {
              const mail = teamMemberInviteLetter({
                data: {
                  admin: {
                    lastName: creator.lastName,
                    firstName: creator.firstName,
                  },
                  team: {
                    name: team.name,
                  },
                  note: invite.note || undefined,
                  link: scope.config.MAIL.links.teamMemberInvite({
                    token: invite.token,
                  }),
                },
              })

              await scope.mailer.send({ to: invite.email }, mail)

              log.debug(
                'Sent team member invitation ' + `mail to ${invite.email}`
              )
            } catch (exc) {
              log.error(
                exc,
                'Failed to send team member ' +
                  `invitation mail to ${invite.email}`
              )
            }

            return mapTeamMemberInvite(invite)
          }
        )
      ),
    teamMemberInviteAccept: field
      .ofType(TeamMemberInviteAcceptResultType)
      .args(arg => ({
        token: arg.ofString(),
      }))
      .resolve(
        createPrivateResolver(
          'teamMemberInviteAccept',
          async ({ log, args, scope }) => {
            const userId = scope.user.id

            const user = await getUser({ where: { id: { eq: userId } } }, scope)

            const invite = await getTeamMemberInvite(
              {
                where: {
                  token: { eq: args.token },
                  email: { eq: user.name },
                },
              },
              scope
            )

            if (!invite) {
              throw notFoundError()
            }

            if (invite.usedAt) {
              log.error(
                `Can not accept invitation #${
                  invite.id
                } because it is already used`
              )
              throw notFoundError()
            }

            const nextTeam = await getTeam(
              { where: { id: { eq: invite.teamId } } },
              scope
            )

            if (!nextTeam) {
              log.error(
                `Could not accept invite #${invite.id} - team #${
                  invite.teamId
                } not found`
              )
              throw notFoundError()
            }

            await deleteTeamMember({ userId: user.id }, scope)

            await createTeamMember(
              {
                teamId: nextTeam.id,
                userId: user.id,
                roleId: invite.roleId || TeamMemberRole.manager,
              },
              scope
            )

            await updateTeamMemberInvite(
              {
                update: {
                  userId: user.id,
                  usedAt: sql`now() at time zone 'utc'`,
                },
                where: { id: { eq: invite.id } },
              },
              scope
            )

            return {
              team: mapTeam(nextTeam),
            }
          }
        )
      ),
    teamMemberInviteMaybeAccept: field
      .ofType(TeamMemberInviteMaybeAcceptResultType)
      .args(arg => ({
        token: arg.ofString(),
      }))
      .resolve(
        createPrivateResolver(
          'teamMemberInviteMaybeAccept',
          async ({ log, args, scope }) => {
            const userId = scope.user.id

            const user = await getUser({ where: { id: { eq: userId } } }, scope)

            const invite = await getTeamMemberInvite(
              {
                where: {
                  token: { eq: args.token },
                  email: { eq: user.name },
                },
              },
              scope
            )

            const team = await getTeam(
              {
                where: {
                  members: {
                    any: {
                      user: {
                        id: { eq: userId },
                      },
                    },
                  },
                },
              },
              scope
            )

            const sameTeam = invite.teamId === team.id

            if (invite && (invite.usedAt ? sameTeam : !sameTeam)) {
              if (sameTeam) {
                return {
                  code: TeamMemberInviteMaybeAcceptResultCode.outdated,
                  team: mapTeam(team),
                  invite: mapTeamMemberInvite(invite),
                }
              }

              const otherMemberCount = await countTeamMembers(
                {
                  where: {
                    team: { id: { eq: team.id } },
                    user: { id: { neq: user.id } },
                  },
                },
                scope
              )

              if (otherMemberCount > 0) {
                const nextTeam = await getTeam(
                  { where: { id: { eq: invite.teamId } } },
                  scope
                )

                if (!nextTeam) {
                  log.error(
                    `Could not accept invite #${invite.id} - team #${
                      invite.teamId
                    } not found`
                  )

                  return {
                    code: TeamMemberInviteMaybeAcceptResultCode.other,
                    team: mapTeam(team),
                    invite: mapTeamMemberInvite(invite),
                  }
                }

                await deleteTeamMember({ userId: user.id }, scope)

                await createTeamMember(
                  {
                    teamId: nextTeam.id,
                    userId: user.id,
                    roleId: invite.roleId || TeamMemberRole.manager,
                  },
                  scope
                )

                await updateTeamMemberInvite(
                  {
                    update: {
                      userId: user.id,
                      usedAt: sql`now() at time zone 'utc'`,
                    },
                    where: { id: { eq: invite.id } },
                  },
                  scope
                )

                return {
                  code: TeamMemberInviteMaybeAcceptResultCode.accepted,
                  team: mapTeam(nextTeam),
                  invite: mapTeamMemberInvite(invite),
                }
              } else {
                return {
                  code: TeamMemberInviteMaybeAcceptResultCode.lastTeamMember,
                  team: mapTeam(team),
                  invite: mapTeamMemberInvite(invite),
                }
              }
            } else {
              return {
                code: TeamMemberInviteMaybeAcceptResultCode.other,
                team: mapTeam(team),
                invite: mapTeamMemberInvite(invite),
              }
            }
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
        published: arg.ofBool().nullable(),
        paymentPids: arg.listOfId().nullable(),
      }))
      .resolve(
        createPrivateResolver('storyCreate', async ({ log, args, scope }) => {
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

          const payments = (args.paymentPids && args.paymentPids.length > 0)
            ? await listPayments(
                {
                  where: {
                    account: {
                      id: { eq: account.id },
                    },
                    and: {
                      or: args.paymentPids.map((x: Pid) => ({
                        pid: { eq: Number(x) },
                      })),
                    },
                  },
                },
                scope
              )
            : []

          if (args.published === true) {
            const canBePublished =
              !!args.title && !!args.body && !!payments.length

            if (!canBePublished) {
              throw argumentError('published')
            }
          }

          const storyId = await createStory(
            {
              userId,
              accountId: account.id,
              title: args.title || null,
              cover: args.cover || null,
              body: args.body || null,
              publishedAt: args.published
                ? sql`now() at time zone 'utc'`
                : null,
            },
            scope
          )

          if (payments.length) {
            await mergeStoryPayments(
              {
                userId,
                storyId,
                paymentIds: payments.map(x => x.id),
              },
              scope
            )
          }

          const story = await getStory(
            { where: { id: { eq: storyId } } },
            scope
          )

          if (!story) {
            throw notFoundError()
          }

          if (story.publishedAt) {
            await scope.uow.commit()

            try {
              const creator = await getUser(
                { where: { id: { eq: userId } } },
                scope
              )

              const aggregatedPayments = await aggregatePayments(
                {
                  fields: ['count', 'postedOnMin', 'postedOnMax'],
                  where: {
                    stories: {
                      any: {
                        id: { eq: story.id },
                      },
                    },
                  },
                },
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

              await Promise.all(
                users.map(async user => {
                  try {
                    const mail = storyPublicationNotification({
                      data: {
                        user,
                        creator,
                        account,
                        story: {
                          title: story.title!,
                          imageUrl: story.cover.thumbs.sized,
                          description: story.body.text,
                          paymentCount: aggregatedPayments.count!,
                          paymentDates: [
                            aggregatedPayments.postedOnMin!,
                            aggregatedPayments.postedOnMax!,
                          ],
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
                      `Sent story publication notification mail to ${
                        user.email
                      }`
                    )
                  } catch (exc) {
                    log.error(
                      exc,
                      'Failed to send story publication ' +
                        `notification mail to ${user.email}`
                    )
                  }
                })
              )
            } catch (exc) {
              log.error(
                exc,
                'Failed to send story publication ' +
                  `notifications for story #${storyId}`
              )
            }
          }

          return mapStory(story)
        })
      ),
    storyDelete: field
      .ofType(StoryDeleteType)
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

          await deleteStoryPayments({ storyId: story.id }, scope)

          await deleteStory({ userId, where: { id: { eq: story.id } } }, scope)

          const account = await getAccount(
            { userId, where: { id: { eq: story.accountId } } },
            scope
          )

          return { account }
        })
      ),
    storyUpdate: field
      .ofType(StoryType)
      .args(arg => ({
        pid: arg.ofId(),
        update: arg.ofType(StoryUpdateUpdateInput),
      }))
      .resolve(
        createPrivateResolver('storyUpdate', async ({ log, args, scope }) => {
          const userId = scope.user.id
          const update: StoryUpdateUpdate = args.update

          const story = await getStory(
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

          if (!story) {
            throw notFoundError()
          }

          const payments = update.paymentPids
            ? await listPayments(
                {
                  where: {
                    account: {
                      id: { eq: story.accountId },
                    },
                    and: {
                      or: update.paymentPids.map(x => ({
                        pid: { eq: Number(x) },
                      })),
                    },
                  },
                },
                scope
              )
            : undefined

          const dalUpdate: UpdateStoryArgs['update'] = {
            title: isNil(update.title) ? undefined : update.title || null,
            cover: isNil(update.cover) ? undefined : update.cover,
            body: isNil(update.body) ? undefined : update.body,
          }

          const canBePublished =
            (dalUpdate.title === undefined
              ? !!story.title
              : !!dalUpdate.title) &&
            (dalUpdate.body === undefined ? !!story.body : !!dalUpdate.body) &&
            (payments
              ? !!payments.length
              : !!(await countPayments(
                  {
                    where: {
                      stories: {
                        any: {
                          id: { eq: story.id },
                        },
                      },
                    },
                  },
                  scope
                )))

          if (isNil(args.update.published)) {
            if (story.publishedAt) {
              if (!canBePublished) {
                dalUpdate.publishedAt = null
              }
            }
          } else if (args.update.published) {
            if (!canBePublished) {
              throw argumentError('published')
            }

            if (!story.publishedAt) {
              dalUpdate.publishedAt = sql`now() at time zone 'utc'`
            }
          } else {
            if (story.publishedAt) {
              dalUpdate.publishedAt = null
            }
          }

          const updatedStoryId = await updateStory(
            {
              userId,
              update: dalUpdate,
              where: { id: { eq: story.id } },
            },
            scope
          )

          if (!updatedStoryId) {
            throw notFoundError()
          }

          if (payments) {
            await mergeStoryPayments(
              {
                userId,
                storyId: updatedStoryId,
                paymentIds: payments.map(x => x.id),
              },
              scope
            )
          }

          const updatedStory = await getStory(
            { where: { id: { eq: updatedStoryId } } },
            scope
          )

          const result = mapStory(updatedStory)

          await scope.uow.commit()

          // send emails for published story
          if (dalUpdate.publishedAt) {
            try {
              const creator = await getUser(
                { where: { id: { eq: userId } } },
                scope
              )

              const updatedStoryAccount = await getAccount(
                { userId, where: { id: { eq: updatedStory.accountId } } },
                scope
              )

              const updatedAggregatedPayments = await aggregatePayments(
                {
                  fields: ['count', 'postedOnMin', 'postedOnMax'],
                  where: {
                    stories: {
                      any: {
                        id: { eq: updatedStory.id },
                      },
                    },
                  },
                },
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

              const storyDescription = mapBodyToPlainShortText(
                updatedStory.body
              )

              await Promise.all(
                users.map(async user => {
                  try {
                    const mail = storyPublicationNotification({
                      data: {
                        user,
                        creator,
                        account: updatedStoryAccount,
                        story: {
                          title: updatedStory.title!,
                          imageUrl: updatedStory.cover.thumbs.sized,
                          description: storyDescription, // body is draftjs data
                          paymentCount: updatedAggregatedPayments.count!,
                          paymentDates: [
                            updatedAggregatedPayments.postedOnMin!,
                            updatedAggregatedPayments.postedOnMax!,
                          ],
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
                      `Sent story publication notification mail to ${
                        user.email
                      }`
                    )
                  } catch (exc) {
                    log.error(
                      exc,
                      'Failed to send story publication ' +
                        `notification mail to ${user.email}`
                    )
                  }
                })
              )
            } catch (exc) {
              log.error(
                exc,
                'Failed to send story publication ' +
                  `notifications for story #${updatedStoryId}`
              )
            }
          }

          return result
        })
      ),
  }))
)

export default MutationType
