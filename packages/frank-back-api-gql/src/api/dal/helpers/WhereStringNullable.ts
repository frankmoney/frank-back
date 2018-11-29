import WhereNullable from './WhereNullable'
import WhereStringBase from './WhereStringBase'

export default interface WhereStringNullable
  extends WhereStringBase,
    WhereNullable {
  or?: WhereStringNullable | WhereStringNullable[]
  and?: WhereStringNullable | WhereStringNullable[]
}
