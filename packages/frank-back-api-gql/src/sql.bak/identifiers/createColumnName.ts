import raw from '../raw'
import toSqlNodeSymbol from '../toSqlNodeSymbol'
import ColumnName from './ColumnName'

const createColumnName = (name: string): ColumnName => ({
  $value: name,
  toString: () => name,
  [toSqlNodeSymbol]: () => raw(name)!,
})

export default createColumnName
