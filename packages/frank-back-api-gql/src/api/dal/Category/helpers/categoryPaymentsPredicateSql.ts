import { Sql, and, join, sql, literal } from 'sql'
import { category, payment } from 'store/names'
import paymentPredicateSql from '../../Payment/helpers/paymentPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import CategoryPaymentsWhere from './CategoryPaymentsWhere'

const categoryPaymentsPredicateSql = (
  alias: string | Sql,
  where?: CategoryPaymentsWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias
  const paymentsAlias$: Sql = sql`${alias$}.payments`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${payment}" "${paymentsAlias$}"`,
          sql`where "${alias$}"."${category.id}"`,
          sql`= "${paymentsAlias$}"."${payment.categoryId}"`,
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.any) {
    branches.push(
      join(
        [
          sql`exists (`,
          sql`select 1`,
          sql`from "${payment}" "${paymentsAlias$}"`,
          sql`where "${alias$}"."${category.id}"`,
          sql`= "${paymentsAlias$}"."${payment.categoryId}"`,
          and(paymentPredicateSql(paymentsAlias$, where.any)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.none) {
    branches.push(
      join(
        [
          sql`not exists (`,
          sql`select 1`,
          sql`from "${payment}" "${paymentsAlias$}"`,
          sql`where "${alias$}"."${category.id}"`,
          sql`= "${paymentsAlias$}"."${payment.categoryId}"`,
          and(paymentPredicateSql(paymentsAlias$, where.any)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(
        ...where.and.map(x => categoryPaymentsPredicateSql(alias, x))
      )
    } else {
      branches.push(categoryPaymentsPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => categoryPaymentsPredicateSql(alias, x))
      )
    } else {
      return disjunction(
        junction,
        categoryPaymentsPredicateSql(alias, where.or)
      )
    }
  } else {
    return junction
  }
}

export default categoryPaymentsPredicateSql
