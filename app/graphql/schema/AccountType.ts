import { ID, String, Type } from 'gql'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    id: field.ofType(ID),
    name: field.ofType(String),
  }))
)

export default AccountType
