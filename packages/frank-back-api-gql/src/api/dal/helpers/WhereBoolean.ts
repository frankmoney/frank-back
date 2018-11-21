import WhereBooleanBase from './WhereBooleanBase'

export default interface WhereBoolean extends WhereBooleanBase {
  or?: WhereBoolean | WhereBoolean[]
  and?: WhereBoolean | WhereBoolean[]
}
