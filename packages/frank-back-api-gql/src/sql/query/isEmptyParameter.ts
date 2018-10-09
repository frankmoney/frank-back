import { KEY, SqlParameter } from '../ast'

const isEmptyParameter = (sql: SqlParameter): boolean =>
  sql[KEY].value === undefined

export default isEmptyParameter
