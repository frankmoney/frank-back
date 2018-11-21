import WhereNullable from './WhereNullable'
import WherePidBase from './WherePidBase'

export default interface WherePidNullable extends WherePidBase, WhereNullable {
  or?: WherePidNullable | WherePidNullable[]
  and?: WherePidNullable | WherePidNullable[]
}
