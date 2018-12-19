import * as R from 'ramda'
import { Type } from 'gql'
import Team from 'store/types/Team'
import { TeamMemberRole } from 'store/enums'
import getTeamMemberByPidAndTeamId from 'api/dal/TeamMember/getTeamMemberByPidAndTeamId'
import getTeamMemberRoleByUserId from 'api/dal/TeamMember/getTeamMemberRoleByUserId'
import listTeamMembersByTeamId from 'api/dal/TeamMember/listTeamMembersByTeamId'
import getUser from 'api/dal/User/getUser'
import listUsers from 'api/dal/User/listUsers'
import mapTeamMember from 'api/mappers/mapTeamMember'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import TeamMemberType from './TeamMemberType'

const TeamType = Type('Team', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    member: field
      .ofType(TeamMemberType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'team:member',
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
      createPrivateResolver('team:members', async ({ parent, args, scope }) => {
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
  }))
)

export default TeamType
