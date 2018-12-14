import { Type } from 'gql'
import Source from 'store/types/Source'
import getAccount from 'api/dal/Account/getAccount'
import mapAccount from 'api/mappers/mapAccount'
import createResolver from 'api/resolvers/utils/createResolver'
import AccountType from './AccountType'
import CurrencyType from './CurrencyType'

const SourceType = Type('Source', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    name: field.ofString(),
    account: field.ofType(AccountType).resolve(
      createResolver('Source:account', async ({ parent, scope }) => {
        const source: Source = parent.$source

        const account = await getAccount(
          {
            userId: scope.user && scope.user.id,
            where: { id: { eq: source.accountId } },
          },
          scope
        )

        return mapAccount(account)
      })
    ),
    currency: field.ofType(CurrencyType).resolve(
      createResolver('Account:currency', async ({ parent }) => {
        const source: Source = parent.$source

        return {
          code: source.currencyCode,
        }
      })
    ),
  }))
)

export default SourceType
