import * as R from 'ramda'
import SqlNode from './SqlNode'
import createSqlFragment from './createSqlFragment'
import createSqlLiteral from './createSqlLiteral'
import isSqlNode from './isSqlNode'

const raw = (body: any): null | SqlNode => {
  if (!R.isNil(body)) {
    if (isSqlNode(body)) {
      if (!body.empty()) {
        return createSqlFragment([createSqlLiteral('or '), body])
      }
    } else {
      return createSqlLiteral(`${body}`)
    }
  }
  return null
}

export default raw
