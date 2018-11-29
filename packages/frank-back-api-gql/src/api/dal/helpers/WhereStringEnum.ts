import WhereStringEnumBase from './WhereStringEnumBase'

export default interface WhereStringEnum<T> extends WhereStringEnumBase<T> {
  or?: WhereStringEnum<T> | WhereStringEnum<T>[]
  and?: WhereStringEnum<T> | WhereStringEnum<T>[]
}
