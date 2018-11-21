import WhereNullable from './WhereNullable'
import WhereNumberBase from './WhereNumberBase'

export default interface WhereNumberNullable
  extends WhereNumberBase,
    WhereNullable {
  or?: WhereNumberNullable | WhereNumberNullable[]
  and?: WhereNumberNullable | WhereNumberNullable[]
}
