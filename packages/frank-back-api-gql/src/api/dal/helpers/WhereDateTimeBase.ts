import { Sql } from 'sql'
import DateTime from 'store/types/DateTime'

export default interface WhereDateTimeBase {
  eq?: Sql | DateTime
  gt?: Sql | DateTime
  lt?: Sql | DateTime
  gte?: Sql | DateTime
  lte?: Sql | DateTime
}
