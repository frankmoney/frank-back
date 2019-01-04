import { Type } from 'gql'
import TeamMemberInvite from 'store/types/TeamMemberInvite'
import getTeam from 'api/dal/Team/getTeam'
import mapTeam from 'api/mappers/mapTeam'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import TeamType from './TeamType'

const TeamMemberInviteType = Type('TeamMemberInvite', type =>
  type.fields(field => ({
    token: field.ofString(),
    email: field.ofString(),
    note: field.ofString().nullable(),
    team: field.ofType(TeamType).resolve(
      createPrivateResolver(
        'TeamMemberInvite:team',
        async ({ parent, scope }) => {
          const invite: TeamMemberInvite = parent.$source

          const team = await getTeam(
            { where: { id: { eq: invite.teamId } } },
            scope
          )

          return mapTeam(team)
        }
      )
    ),
  }))
)

export default TeamMemberInviteType
