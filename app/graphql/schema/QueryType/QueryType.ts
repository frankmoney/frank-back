import { ID, String, Type } from 'gql'
import AccountType from '../AccountType'
import account from './account'
import accounts from './accounts'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    account: field
      .ofType(AccountType)
      .args(arg => ({
        id: arg.ofType(ID),
      }))
      .resolve(account),
    accounts: field
      .listOf(AccountType)
      .args(arg => ({
        search: arg.ofType(String).nullable(),
      }))
      .resolve(accounts),
  }))
)

export default QueryType
