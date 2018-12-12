import { Type } from 'gql'
import AccountAccessRoleType from './AccountAccessRoleType'

const AccountAccessType = Type('AccountAccess', type =>
  type.fields(field => ({
    role: field.ofType(AccountAccessRoleType),
  }))
)

export default AccountAccessType
