export default interface Where<T> {
  eq?: T
  gt?: T
  lt?: T
  gte?: T
  lte?: T
  startsWith?: T | [T, boolean]
  endsWith?: T | [T, boolean]
  contains?: T | [T, boolean]
  ilike?: string
  like?: string
  empty?: boolean
  isNull?: boolean
  isNotNull?: boolean
  or?: Where<T> | Where<T>[]
  and?: Where<T> | Where<T>[]
}
