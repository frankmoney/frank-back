import { KEY, Sql, SqlFragment, SqlLiteral, SqlParameter } from '../ast'
import isEmptyFragment from './isEmptyFragment'
import isEmptyLiteral from './isEmptyLiteral'
import isEmptyParameter from './isEmptyParameter'

const isEmpty = (sql: Sql): boolean => {
  switch (sql[KEY].type) {
    case 'literal':
      return isEmptyLiteral(<SqlLiteral>sql)
    case 'parameter':
      return isEmptyParameter(<SqlParameter>sql)
    case 'fragment':
      return isEmptyFragment(<SqlFragment>sql)
  }
}

export default isEmpty
