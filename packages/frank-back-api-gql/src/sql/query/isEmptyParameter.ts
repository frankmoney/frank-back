import { KEY, SqlParameter } from '../ast'

const isEmptyParameter = (sql: SqlParameter): boolean =>
  sql[KEY].value === undefined || sql[KEY].value === null

export default isEmptyParameter
