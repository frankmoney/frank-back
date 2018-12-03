import { Sql, literal, sql } from 'sql'
import { category } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import CategoryWhere from './CategoryWhere'

const categoryPredicateSql = (
  alias: string | Sql,
  where?: CategoryWhere
): undefined | Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return where
    ? conjunction(
        createWhereSql(sql`"${alias$}"."${category.id}"`, where.id),
        createWhereSql(sql`"${alias$}"."${category.pid}"`, where.pid),
        createWhereSql(sql`"${alias$}"."${category.type}"`, where.type)
      )
    : undefined
}

export default categoryPredicateSql
