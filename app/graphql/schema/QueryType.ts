import { Account, AccountWhereInput } from 'app/graphql/generated/prisma'
import { String, Type } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import AccountType from './AccountType'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    accounts: field
      .listOf(AccountType)
      .args(arg => ({
        search: arg.ofType(String).nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'accounts',
          async ({ args, prisma: { query } }) => {
            const where: AccountWhereInput = {}
            if (args.search) {
              where.name_contains = args.search
            }
            const rows = await query.accounts<Account[]>({ where })
            return rows.map(({ id, name }) => ({ id, name }))
          }
        )
      ),
  }))
)

export default QueryType
