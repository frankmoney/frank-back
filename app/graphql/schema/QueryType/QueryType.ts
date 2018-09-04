import { ID, String, Type } from 'gql'
import AccountType from '../AccountType'
import StoryType from '../StoryType'
import account from './account'
import accounts from './accounts'
import story from './story'
import stories from './stories'

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
    story: field
      .ofType(StoryType)
      .args(arg => ({
        id: arg.ofType(ID),
      }))
      .resolve(story),
    stories: field
      .listOf(StoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        isPublished: arg.ofBool().nullable(),
      }))
      .resolve(stories),
  })),
)

export default QueryType
