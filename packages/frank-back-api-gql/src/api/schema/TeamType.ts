import * as R from 'ramda'
import { Type } from 'gql'
import Team from 'store/types/Team'
import { TeamMemberRole } from 'store/enums'
import listAccounts from 'api/dal/Account/listAccounts'
import getTeamMemberByPidAndTeamId from 'api/dal/TeamMember/getTeamMemberByPidAndTeamId'
import getTeamMemberRoleByUserId from 'api/dal/TeamMember/getTeamMemberRoleByUserId'
import listTeamMembersByTeamId from 'api/dal/TeamMember/listTeamMembersByTeamId'
import listTeamMemberInvites from 'api/dal/TeamMemberInvite/listTeamMemberInvites'
import getUser from 'api/dal/User/getUser'
import listUsers from 'api/dal/User/listUsers'
import mapAccount from 'api/mappers/mapAccount'
import mapTeamMember from 'api/mappers/mapTeamMember'
import mapTeamMemberInvite from 'api/mappers/mapTeamMemberInvite'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import TeamMemberInviteType from './TeamMemberInviteType'
import TeamMemberType from './TeamMemberType'

const TeamType = Type('Team', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    accounts: field.listOf(AccountType).resolve(
      createPrivateResolver('Team:accounts', async ({ parent, scope }) => {
        const team: Team = parent.$source
        const userId = scope.user.id

        const accounts = await listAccounts(
          {
            userId,
            where: {
              team: { id: { eq: team.id } },
              and: {
                or: [
                  { public: { eq: true } },
                  {
                    team: {
                      members: {
                        any: {
                          user: {
                            id: { eq: userId },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          scope
        )

        return mapAccount(accounts)
      })
    ),
    member: field
      .ofType(TeamMemberType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Team:member',
          async ({ parent, args, scope }) => {
            const team: Team = parent.$source

            const member = await getTeamMemberByPidAndTeamId(
              {
                pid: Number(args.pid),
                teamId: team.id,
              },
              scope
            )

            const user = await getUser(
              { where: { id: { eq: member.userId } } },
              scope
            )

            const currentUserId = scope.user.id
            const currentUserRole = await getTeamMemberRoleByUserId(
              { userId: currentUserId },
              scope
            )
            const admin = currentUserRole === TeamMemberRole.administrator

            return mapTeamMember({
              member,
              user,
              currentUserId,
              admin,
            })
          }
        )
      ),
    members: field.listOf(TeamMemberType).resolve(
      createPrivateResolver('Team:members', async ({ parent, args, scope }) => {
        const team: Team = parent.$source

        const members = await listTeamMembersByTeamId(
          { teamId: team.id },
          scope
        )

        const users = await listUsers(
          {
            where: {
              or: members.map(({ userId }) => ({ id: { eq: userId } })),
            },
          },
          scope
        )

        const currentUserId = scope.user.id
        const currentUserRole = await getTeamMemberRoleByUserId(
          { userId: currentUserId },
          scope
        )
        const admin = currentUserRole === TeamMemberRole.administrator

        const result = mapTeamMember(
          members.map(member => ({
            member,
            user: R.find(R.propEq('id', member.userId), users)!,
            currentUserId,
            admin,
          }))
        )

        return result
      })
    ),
    invites: field.listOf(TeamMemberInviteType).resolve(
      createPrivateResolver('Team:invites', async ({ parent, args, scope }) => {
        const team: Team = parent.$source

        const invites = await listTeamMemberInvites(
          {
            where: {
              team: { id: { eq: team.id } },
              usedAt: { isNull: true },
            },
          },
          scope
        )

        return mapTeamMemberInvite(invites)
      })
    ),
  }))
)

export default TeamType
