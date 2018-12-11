import { Sql, join, literal, sql } from 'sql'
import { category, payment } from 'store/names'
import CategoryWhere from '../../Category/helpers/CategoryWhere'
import categoryPredicateSql from '../../Category/helpers/categoryPredicateSql'

const paymentCategoryPredicateSql = (
  alias: string | Sql,
  where?: CategoryWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const categoryAlias$: Sql = sql`${alias$}.category`

  const categoryWhereSql = categoryPredicateSql(categoryAlias$)

  if (!categoryWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${category}" "${categoryAlias$}"`,
      sql`where "${alias$}"."${payment.categoryId}"`,
      sql`= "${categoryAlias$}"."${category.id}"`,
      sql`and ${categoryWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default paymentCategoryPredicateSql
