import SqlNode from './SqlNode'
import sqlNodeSymbol from './sqlNodeSymbol'

const isSqlNode = (obj: any): obj is SqlNode => !!obj[sqlNodeSymbol]

export default isSqlNode
