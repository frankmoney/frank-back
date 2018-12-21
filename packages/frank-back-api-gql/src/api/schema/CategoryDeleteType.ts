import { Type } from 'gql'
import AccountType from './AccountType'
import CategoryDeleteResultType from './CategoryDeleteResultType'

const CategoryDeleteType = Type('CategoryDelete', type =>
  type.fields(field => ({
    result: field.ofType(CategoryDeleteResultType),
    account: field.ofType(AccountType),
  }))
)

export default CategoryDeleteType
