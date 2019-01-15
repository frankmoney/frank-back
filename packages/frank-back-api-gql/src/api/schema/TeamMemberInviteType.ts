import { Type } from 'gql'
import TeamMemberInvite from 'store/types/TeamMemberInvite'
import getTeam from 'api/dal/Team/getTeam'
import getUser from 'api/dal/User/getUser'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import createResolver from 'api/resolvers/utils/createResolver'
import TeamType from './TeamType'
import UserType from './UserType'

const TeamMemberInviteType = Type('TeamMemberInvite', type =>
  type.fields(field => ({
    email: field.ofString(),
    note: field.ofString().nullable(),
    creator: field.ofType(UserType).resolve(
      createResolver('TeamMemberInvite:creator', async ({ parent, scope }) => {
        const invite: TeamMemberInvite = parent.$source

        const creator = await getUser(
          { where: { id: { eq: invite.creatorId } } },
          scope
        )

        return mapUser(creator)
      })
    ),
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
