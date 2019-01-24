import { Type } from 'gql'
import Source from 'store/types/Source'
import getAccount from 'api/dal/Account/getAccount'
import mapAccount from 'api/mappers/mapAccount'
import createResolver from 'api/resolvers/utils/createResolver'
import AccountType from './AccountType'
import CurrencyType from './CurrencyType'
import SourceStatusType from './SourceStatusType'

const SourceType = Type('Source', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    name: field.ofString(),
    status: field.ofType(SourceStatusType),
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
      createResolver('Source:currency', async ({ parent }) => {
        const source: Source = parent.$source

        return {
          code: source.currencyCode,
        }
      })
    ),
    bankLogo: field
      .ofString()
      .nullable()
      .resolve(
        createResolver(
          'Source:bankLogo',
          ({ parent }) => parent.$source.data.bankLogo
        )
      ),
    bankName: field
      .ofString()
      .nullable()
      .resolve(
        createResolver(
          'Source:bankName',
          ({ parent }) => parent.$source.data.bankName
        )
      ),
    bankLink: field
      .ofString()
      .nullable()
      .resolve(
        createResolver(
          'Source:bankLink',
          ({ parent }) => parent.$source.data.bankLink
        )
      ),
    balance: field
      .ofFloat()
      .nullable()
      .resolve(
        createResolver(
          'Source:balance',
          ({ parent }) => parent.$source.data.balance
        )
      ),
    connectedOn: field
      .ofDate()
      .resolve(
        createResolver(
          'Source.connectedOn',
          ({ parent }) => parent.$source.createdAt
        )
      ),
    lastUpdate: field
      .ofDate()
      .nullable()
      .resolve(
        createResolver(
          'Source.lastUpdate',
          ({ parent }) => parent.$source.data.lastUpdateDate
        )
      ),
  }))
)

export default SourceType
