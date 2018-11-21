import WhereDateBase from './WhereDateBase'

export default interface WhereDate extends WhereDateBase {
  or?: WhereDate | WhereDate[]
  and?: WhereDate | WhereDate[]
}
