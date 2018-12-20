export default interface WhereStringBase {
  eq?: string | [string, boolean]
  startsWith?: string | [string, boolean]
  endsWith?: string | [string, boolean]
  contains?: string | [string, boolean]
  empty?: boolean
  ilike?: string
  like?: string
}
