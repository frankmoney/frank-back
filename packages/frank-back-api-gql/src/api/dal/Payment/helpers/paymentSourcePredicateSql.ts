import { Sql, join, literal, sql } from 'sql'
import { payment, source } from 'store/names'
import SourceWhere from '../../Source/helpers/SourceWhere'
import sourcePredicateSql from '../../Source/helpers/sourcePredicateSql'

const paymentSourcePredicateSql = (
  alias: string | Sql,
  where: undefined | null | SourceWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const sourceAlias$: Sql = sql`${alias$}.source`

  const sourceWhereSql = sourcePredicateSql(sourceAlias$, where)

  if (!sourceWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${source}" "${sourceAlias$}"`,
      sql`where "${alias$}"."${payment.sourceId}"`,
      sql`= "${sourceAlias$}"."${source.id}"`,
      sql`and ${sourceWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default paymentSourcePredicateSql
