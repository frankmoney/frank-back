import { Type, Json } from 'gql'
import getAccount from 'api/dal/Account/getAccount'
import listAccounts from 'api/dal/Account/listAccounts'
import getTeamByUserId from 'api/dal/Team/getTeamByUserId'
import getUserById from 'api/dal/User/getUserById'
import mapAccount from 'api/mappers/mapAccount'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'
import onboarding from 'api/resolvers/onboarding'
import onboardingInstitutions from 'api/resolvers/onboardingInstitutions'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import createResolver from 'api/resolvers/utils/createResolver'
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
        createResolver('me', async ({ scope }) => {
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
    account: field
      .ofType(AccountType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createResolver('account', async ({ args, scope }) => {
          const account = await getAccount(
            {
              userId: scope.user && scope.user.id,
              where: { pid: { eq: args.pid } },
            },
            scope
          )

          return mapAccount(account)
        })
      ),
    accounts: field
      .listOf(AccountType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver('accounts', async ({ args, scope }) => {
          const accounts = await listAccounts(
            {
              userId: scope.user.id,
              where: {
                team: {
                  members: {
                    any: {
                      user: {
                        id: {
                          eq: scope.user.id,
                        },
                      },
                    },
                  },
                },
                name: args.search ? { contains: args.search } : undefined,
              },
            },
            scope
          )

          return mapAccount(accounts)
        })
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
  }))
)

export default QueryType
