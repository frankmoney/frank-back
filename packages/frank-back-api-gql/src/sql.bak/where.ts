import * as R from 'ramda'
import SqlNode from './SqlNode'
import createSqlFragment from './createSqlFragment'
import createSqlLiteral from './createSqlLiteral'
import isSqlNode from './isSqlNode'

const where = (body?: null | string | SqlNode): null | SqlNode => {
  if (!R.isNil(body)) {
    if (isSqlNode(body)) {
      if (!body.empty()) {
        return createSqlFragment([createSqlLiteral('where '), body])
      }
    } else {
      return createSqlFragment([
        createSqlLiteral('where '),
        createSqlLiteral(body),
      ])
    }
  }
  return null
}

export default where
