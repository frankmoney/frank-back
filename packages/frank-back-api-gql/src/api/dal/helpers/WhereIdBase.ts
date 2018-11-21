import Id from 'store/types/Id'

export default interface WhereIdBase {
  eq?: Id
  gt?: Id
  lt?: Id
  gte?: Id
  lte?: Id
}
