import SqlNode from '../SqlNode'
import toSqlNodeSymbol from '../toSqlNodeSymbol'

type Name = {
  $value: string
  toString: () => string
  [toSqlNodeSymbol]: () => SqlNode
}

export default Name
