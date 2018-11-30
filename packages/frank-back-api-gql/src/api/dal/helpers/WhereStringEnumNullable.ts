import WhereNullable from './WhereNullable'
import WhereStringEnumBase from './WhereStringEnumBase'

export default interface WhereStringEnumNullable<T>
  extends WhereStringEnumBase<T>,
    WhereNullable {
  or?: WhereStringEnumNullable<T> | WhereStringEnumNullable<T>[]
  and?: WhereStringEnumNullable<T> | WhereStringEnumNullable<T>[]
}
