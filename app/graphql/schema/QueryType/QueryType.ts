import { ID, String, Type } from 'gql'
import AccountType from '../AccountType'
import MeType from '../MeType'
import TeamType from '../TeamType'
import account from './account'
import accounts from './accounts'
import me from './me'
import team from './team'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    me: field
      .ofType(MeType)
      .nullable()
      .resolve(me),

    team: field.ofType(TeamType).resolve(team),

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
