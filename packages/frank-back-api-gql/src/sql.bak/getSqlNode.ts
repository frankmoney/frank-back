import SqlNode from './SqlNode'
import getToSqlNode from './getToSqlNode'
import isSqlNode from './isSqlNode'

const getSqlNodeCore = (obj: any, stack: Set<any>): undefined | SqlNode => {
  if (isSqlNode(obj)) {
    return obj
  }
  if (!stack.has(obj)) {
    const toSqlNode = getToSqlNode(obj)
    if (toSqlNode) {
      const toSqlNodeResult = toSqlNode()
      stack.add(toSqlNodeResult)
      return getSqlNodeCore(toSqlNodeResult, stack)
    }
  }
  return undefined
}

const getSqlNode = (obj: any) => getSqlNodeCore(obj, new Set())

export default getSqlNode
