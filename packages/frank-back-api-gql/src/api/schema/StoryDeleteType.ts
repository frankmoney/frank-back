import { Type } from 'gql'
import AccountType from './AccountType'

const StoryDeleteType = Type('StoryDelete', type =>
  type.fields(field => ({
    account: field.ofType(AccountType),
  }))
)

export default StoryDeleteType
