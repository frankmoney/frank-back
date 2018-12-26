import WhereDateTimeNullable from '../../helpers/WhereDateTimeNullable'
import WhereId from '../../helpers/WhereId'
import WhereString from '../../helpers/WhereString'

export default interface PasswordResetWhere {
  id?: WhereId
  createdAt?: WhereDateTimeNullable
  usedAt?: WhereDateTimeNullable
  token?: WhereString
  or?: PasswordResetWhere | PasswordResetWhere[]
  and?: PasswordResetWhere | PasswordResetWhere[]
}
