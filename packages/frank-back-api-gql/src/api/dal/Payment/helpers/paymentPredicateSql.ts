import { Sql, join, sql, literal } from 'sql'
import { payment, peer } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import PaymentWhere from './PaymentWhere'
import paymentAccountPredicateSql from './paymentAccountPredicateSql'
import paymentCategoryPredicateSql from './paymentCategoryPredicateSql'
import paymentPeerPredicateSql from './paymentPeerPredicateSql'
import paymentStoriesPredicateSql from './paymentStoriesPredicateSql'

const paymentPredicateSql = (
  alias: string | Sql,
  where: undefined | null | PaymentWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${payment.amount}"`, where.amount),
    createWhereSql(sql`"${alias$}"."${payment.postedOn}"`, where.postedOn),
    createWhereSql(sql`"${alias$}"."${payment.verified}"`, where.verified),
    createWhereSql(sql`"${alias$}"."${payment.pending}"`, where.pending),
    paymentAccountPredicateSql(alias$, where.account),
    paymentCategoryPredicateSql(alias$, where.category),
    paymentPeerPredicateSql(alias$, where.peer),
    paymentStoriesPredicateSql(alias$, where.stories),
    where.containsText
      ? disjunction(
          sql`"${alias$}"."${payment.description}" ilike ${`%${
            where.containsText
          }%`}`,
          conjunction(
            sql`"${alias$}"."${payment.peerId}" is null`,
            join(
              [
                sql`"${alias$}"."${payment.peerName}"`,
                sql`ilike ${`%${where.containsText}%`}`,
              ],
              ' '
            )
          ),
          conjunction(
            sql`"${alias$}"."${payment.peerId}" is not null`,
            join(
              [
                sql`exists (`,
                sql`select 1`,
                sql`from "${peer}"`,
                sql`where "${peer}"."${peer.id}"`,
                sql`= "${alias$}"."${payment.peerId}"`,
                sql`and "${peer}"."${peer.name}"`,
                sql`ilike ${`%${where.containsText}%`}`,
                sql`)`,
              ],
              ' '
            )
          )
        )
      : undefined,
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => paymentPredicateSql(alias, x)))
    } else {
      branches.push(paymentPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => paymentPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, paymentPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default paymentPredicateSql
