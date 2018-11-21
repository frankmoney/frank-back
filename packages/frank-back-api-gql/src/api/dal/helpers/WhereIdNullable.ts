import WhereNullable from './WhereNullable'
import WhereIdBase from './WhereIdBase'

export default interface WhereIdNullable extends WhereIdBase, WhereNullable {
  or?: WhereIdNullable | WhereIdNullable[]
  and?: WhereIdNullable | WhereIdNullable[]
}
