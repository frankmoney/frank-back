import { KEY, SqlLiteral } from '../ast'

const isEmptyLiteral = (sql: SqlLiteral): boolean => !sql[KEY].text

export default isEmptyLiteral
