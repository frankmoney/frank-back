import { Type, Json } from 'gql'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import getUserById from 'api/dal/User/getUserById'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import onboardingInstitutions from './onboardingInstitutions'
import OnboardingType from './OnboardingType'
import TeamType from './TeamType'
import UserType from './UserType'
import onboarding from './onboarding'

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
        }),
      ),
    team: field
      .ofType(TeamType)
      .resolve(
        createPrivateResolver('team', async ({ scope }) =>
          mapTeam(await getTeamByUserId({ userId: scope.user.id }, scope)),
        ),
      ),
    onboarding: field
      .ofType(OnboardingType)
      .nullable()
      .resolve(onboarding),
    onboardingInstitutions: field
      .listOf(Json)
      .args(arg => ({
        name: arg.ofString().nullable(),
      }))
      .resolve(onboardingInstitutions),
  })),
)

export default QueryType
