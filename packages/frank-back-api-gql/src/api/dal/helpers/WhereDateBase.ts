import Date from 'store/types/Date'

export default interface WhereDateBase {
  eq?: Date
  gt?: Date
  lt?: Date
  gte?: Date
  lte?: Date
}
