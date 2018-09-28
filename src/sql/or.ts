import * as R from 'ramda'
import SqlNode from './SqlNode'
import createSqlFragment from './createSqlFragment'
import createSqlLiteral from './createSqlLiteral'
import isSqlNode from './isSqlNode'

const or = (body: string | SqlNode): null | SqlNode => {
  if (!R.isNil(body)) {
    if (isSqlNode(body)) {
      if (!body.empty()) {
        return createSqlFragment([createSqlLiteral('or '), body])
      }
    } else {
      return createSqlFragment([
        createSqlLiteral('or '),
        createSqlLiteral(body),
      ])
    }
  }
  return null
}

export default or
