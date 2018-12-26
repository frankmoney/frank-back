import WhereDateTimeBase from './WhereDateTimeBase'
import WhereNullable from './WhereNullable'

export default interface WhereDateTimeNullable
  extends WhereDateTimeBase,
    WhereNullable {
  or?: WhereDateTimeNullable | WhereDateTimeNullable[]
  and?: WhereDateTimeNullable | WhereDateTimeNullable[]
}
