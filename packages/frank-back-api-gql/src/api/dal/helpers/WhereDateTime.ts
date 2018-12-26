import WhereDateTimeBase from './WhereDateTimeBase'

export default interface WhereDateTime extends WhereDateTimeBase {
  or?: WhereDateTime | WhereDateTime[]
  and?: WhereDateTime | WhereDateTime[]
}
