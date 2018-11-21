import WhereNullable from './WhereNullable'
import WhereBooleanBase from './WhereBooleanBase'

export default interface WhereBooleanNullable
  extends WhereBooleanBase,
    WhereNullable {
  or?: WhereBooleanNullable | WhereBooleanNullable[]
  and?: WhereBooleanNullable | WhereBooleanNullable[]
}
