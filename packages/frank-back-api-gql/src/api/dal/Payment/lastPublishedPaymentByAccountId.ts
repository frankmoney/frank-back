import { and, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import createQuery from '../createQuery'
import paymentFieldsSql from './helpers/paymentFieldsSql'

export type Args = {
  accountId: Id
  amount?: number
  peerId?: Id | null
  categoryId?: Id | null
  description?: Id | null
}

export default createQuery<Args, Payment | undefined>(
  'lastPublishedPaymentByAccountId',
  (args, { db }) => {
    const byAmountSql = and(
      args.amount ? sql`p."${payment.amount}" = ${args.amount}` : undefined
    )

    const byPeerSql = and(
      args.peerId ? sql`p."${payment.peerId}" = ${args.peerId}` : undefined
    )

    const byCategorySql = and(
      args.categoryId
        ? sql`p."${payment.categoryId}" = ${args.categoryId}`
        : undefined
    )

    const byDescriptionSql = and(
      args.description
        ? sql`p."${payment.description}" = ${args.description}`
        : undefined
    )

    return db.first(
      sql`
        select ${paymentFieldsSql('p')}
        from "${payment}" p
        where p."${payment.accountId}" = ${args.accountId} 
        and p."${payment.verified}" = true
        ${byAmountSql}
        ${byPeerSql}
        ${byCategorySql}
        ${byDescriptionSql}
        order by p."${payment.postedOn}" desc
        limit 1
      `,
      mapPayment
    )
  }
)
