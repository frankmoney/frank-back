import SqlNode from './SqlNode'
import toSqlNodeSymbol from './toSqlNodeSymbol'

const getToSqlNode = (obj: any): (() => SqlNode) => {
  const toSqlNode = obj[toSqlNodeSymbol]
  return toSqlNode && toSqlNode.bind(obj)
}

export default getToSqlNode
