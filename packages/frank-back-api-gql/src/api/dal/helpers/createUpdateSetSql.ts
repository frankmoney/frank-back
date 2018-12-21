import { Sql, join, literal, sql } from 'sql'

const stringOrSqlToSql = (x: Sql | string): Sql =>
  typeof x === 'string' ? literal(x) : x

const createUpdateSetSql = <
  TValues extends { [key: string]: undefined | null | any },
  TAppend extends { [key: string]: undefined | null | any }
>({
  values,
  columns,
  types,
  append,
}: {
  values: TValues
  columns: { [K in keyof TValues]-?: Sql | string } &
    { [K in keyof TAppend]-?: Sql | string }
  types?: { [K in keyof TValues]?: Sql | string } &
    { [K in keyof TAppend]?: Sql | string }
  append?: TAppend
}): undefined | Sql => {
  const list = []

  for (const key of Object.keys(values) as (keyof TValues & keyof TAppend)[]) {
    const value = values[key]
    if (value !== undefined) {
      const column = stringOrSqlToSql(columns[key])
      const type: undefined | Sql | string = types && types[key]

      if (type) {
        const typeSql = stringOrSqlToSql(type)
        list.push(sql`${column} = ${value}::${typeSql}`)
      } else {
        list.push(sql`${column} = ${value}`)
      }
    }
  }

  if (list.length) {
    if (append) {
      for (const key of Object.keys(append) as (keyof TValues &
        keyof TAppend)[]) {
        const value = append[key]
        if (value !== undefined) {
          const column = stringOrSqlToSql(columns[key])
          const type: undefined | Sql | string = types && types[key]

          if (type) {
            const typeSql = stringOrSqlToSql(type)
            list.push(sql`${column}::${typeSql} = ${value}`)
          } else {
            list.push(sql`${column} = ${value}`)
          }
        }
      }
    }

    return join(list, ', ')
  } else {
    return undefined
  }
}

export default createUpdateSetSql
