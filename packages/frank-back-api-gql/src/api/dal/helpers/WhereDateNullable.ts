import WhereDateBase from './WhereDateBase'
import WhereNullable from './WhereNullable'

export default interface WhereDateNullable
  extends WhereDateBase,
    WhereNullable {
  or?: WhereDateNullable | WhereDateNullable[]
  and?: WhereDateNullable | WhereDateNullable[]
}
