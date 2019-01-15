import Id from 'store/types/Id'

export default interface WhereIdBase {
  eq?: Id
  neq?: Id
  gt?: Id
  lt?: Id
  gte?: Id
  lte?: Id
}
