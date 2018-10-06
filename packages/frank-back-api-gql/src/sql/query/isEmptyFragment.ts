import { KEY, SqlFragment } from '../ast'
import isEmpty from './isEmpty'

const isEmptyFragment = (sql: SqlFragment): boolean =>
  sql[KEY].children.filter(x => !isEmpty(x)).length === 0

export default isEmptyFragment
