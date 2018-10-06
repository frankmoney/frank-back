import { mapObjIndexed } from 'ramda'
import raw from '../raw'
import toSqlNodeSymbol from '../toSqlNodeSymbol'
import ColumnName from './ColumnName'
import TableName from './TableName'
import createColumnName from './createColumnName'

const createTableName = <T>(name: string, columns: T): TableName<T> => {
  const tableName = {
    $value: name,
    toString: () => name,
    [toSqlNodeSymbol]: () => raw(name)!,
  }

  const columnNames = mapObjIndexed(createColumnName, columns)

  return Object.assign(tableName, <{ [K in keyof T]: ColumnName }>columnNames)
}

export default createTableName
