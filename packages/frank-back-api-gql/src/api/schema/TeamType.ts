import * as R from 'ramda'
import { Type } from 'gql'
import getTeamMemberByPidAndTeamId from 'api/dal/TeamMember/getTeamMemberByPidAndTeamId'
import listTeamMembersByTeamId from 'api/dal/TeamMember/listTeamMembersByTeamId'
import getUserById from 'api/dal/User/getUserById'
import listUsersByIds from 'api/dal/User/listUsersByIds'
import mapTeamMember from 'api/mappers/mapTeamMember'
import Team from 'store/types/Team'
import createPrivateResolver from '../resolvers/utils/createPrivateResolver'
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

            const user = await getUserById({ id: member.userId }, scope)

            return mapTeamMember({ member, user, currentUserId: scope.user.id })
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

        const users = await listUsersByIds(
          { ids: members.map(x => x.userId) },
          scope
        )

        const result = mapTeamMember(
          members.map(member => ({
            member,
            user: R.find(R.propEq('id', member.userId), users)!,
            currentUserId: scope.user.id,
          }))
        )

        return result
      })
    ),
  }))
)

export default TeamType
