import SqlNode from './SqlNode'
import toSqlNodeSymbol from './toSqlNodeSymbol'

type WithToSqlNode = {
  [toSqlNodeSymbol](): SqlNode
}

export default WithToSqlNode
