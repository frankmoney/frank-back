import { Sql, and, join, sql, literal } from 'sql'
import { payment, peer } from 'store/names'
import paymentPredicateSql from '../../Payment/helpers/paymentPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import PeerPaymentsWhere from './PeerPaymentsWhere'

const peerPaymentsPredicateSql = (
  alias: string | Sql,
  where: undefined | null | PeerPaymentsWhere
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
          sql`where "${alias$}"."${peer.id}"`,
          sql`= "${paymentsAlias$}"."${payment.peerId}"`,
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
          sql`where "${alias$}"."${peer.id}"`,
          sql`= "${paymentsAlias$}"."${payment.peerId}"`,
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
          sql`where "${alias$}"."${peer.id}"`,
          sql`= "${paymentsAlias$}"."${payment.peerId}"`,
          and(paymentPredicateSql(paymentsAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => peerPaymentsPredicateSql(alias, x)))
    } else {
      branches.push(peerPaymentsPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => peerPaymentsPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, peerPaymentsPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default peerPaymentsPredicateSql
