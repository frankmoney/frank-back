import SqlBuildContext from './SqlBuildContext'
import SqlNode from './SqlNode'
import SqlNodeType from './SqlNodeType'
import createSqlFragment from './createSqlFragment'
import sqlNodeSymbol from './sqlNodeSymbol'

type CreateSqlNodeArgs = {
  type: SqlNodeType
  empty: () => boolean
  build: (context: SqlBuildContext) => void
  exec?: (next: SqlNode) => null | SqlNode
}

const createSqlNode = ({
  type,
  empty,
  build,
  exec,
}: CreateSqlNodeArgs): SqlNode => {
  let node: SqlNode

  function func(next: SqlNode): null | SqlNode {
    return node.exec(next)
  }

  node = <SqlNode>func

  if (!exec) {
    exec = next =>
      next && !next.empty() ? createSqlFragment([node, next]) : null
  }

  node[sqlNodeSymbol] = type
  node.type = type
  node.empty = empty
  node.build = build
  node.exec = exec

  return node
}

export default createSqlNode
