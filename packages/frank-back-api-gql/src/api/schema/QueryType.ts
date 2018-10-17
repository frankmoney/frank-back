import { Type, Json } from 'gql'
import getAccountByPidAndUserId from 'api/dal/Account/getAccountByPidAndUserId'
import listAccountsByUserId from 'api/dal/Account/listAccountsByUserId'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import getUserById from 'api/dal/User/getUserById'
import mapAccount from 'api/mappers/mapAccount'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import onboardingInstitutions from 'api/resolvers/onboardingInstitutions'
import onboarding from 'api/resolvers/onboarding'
import OnboardingType from './OnboardingType'
import AccountType from './AccountType'
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
    account: field
      .ofType(AccountType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver('account', async ({ args, scope }) =>
          mapAccount(
            await getAccountByPidAndUserId(
              { pid: args.pid, userId: scope.user.id },
              scope,
            ),
          ),
        ),
      ),
    accounts: field
      .listOf(AccountType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver('accounts', async ({ args, scope }) =>
          mapAccount(
            await listAccountsByUserId(
              { userId: scope.user.id, search: args.search },
              scope,
            ),
          ),
        ),
      ),
  })),
)

export default QueryType
