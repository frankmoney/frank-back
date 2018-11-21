import WhereIdBase from './WhereIdBase'

export default interface WhereId extends WhereIdBase {
  or?: WhereId | WhereId[]
  and?: WhereId | WhereId[]
}
