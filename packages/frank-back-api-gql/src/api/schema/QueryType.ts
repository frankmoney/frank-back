import { Type } from 'gql'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import getUserById from 'api/dal/User/getUserById'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import TeamType from './TeamType'
import UserType from './UserType'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    me: field
      .ofType(UserType)
      .nullable()
      .resolve(
        createPrivateResolver('me', async ({ scope }) => {
          if (scope.user) {
            const user = await getUserById({ id: scope.user.id }, scope)
            return mapUser(user)
          }
          return null
        })
      ),
    team: field
      .ofType(TeamType)
      .resolve(
        createPrivateResolver('team', async ({ scope }) =>
          mapTeam(await getTeamByUserId({ userId: scope.user.id }, scope))
        )
      ),
  }))
)

export default QueryType
