import SqlNode from './SqlNode'
import toSqlNodeSymbol from './toSqlNodeSymbol'

const hasToSqlNode = (obj: any): obj is { [toSqlNodeSymbol]: SqlNode } =>
  !!obj[toSqlNodeSymbol]

export default hasToSqlNode
