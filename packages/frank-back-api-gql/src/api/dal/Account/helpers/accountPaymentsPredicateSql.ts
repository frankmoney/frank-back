import { Sql, and, join, sql, literal } from 'sql'
import { account, payment } from 'store/names'
import paymentPredicateSql from '../../Payment/helpers/paymentPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import AccountPaymentsWhere from './AccountPaymentsWhere'

const accountPaymentsPredicateSql = (
  alias: string | Sql,
  where: undefined | null | AccountPaymentsWhere
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
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${paymentsAlias$}"."${payment.accountId}"`,
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
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${paymentsAlias$}"."${payment.accountId}"`,
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
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${paymentsAlias$}"."${payment.accountId}"`,
          and(paymentPredicateSql(paymentsAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(
        ...where.and.map(x => accountPaymentsPredicateSql(alias, x))
      )
    } else {
      branches.push(accountPaymentsPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => accountPaymentsPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, accountPaymentsPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default accountPaymentsPredicateSql
