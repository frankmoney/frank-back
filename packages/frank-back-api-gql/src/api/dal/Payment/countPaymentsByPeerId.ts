import * as R from 'ramda'
import { and, sql } from 'sql'
import { payment, peer } from 'store/names'
import Payment from 'store/types/Payment'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
  postedOnMin?: Date
  postedOnMax?: Date
  amountMin?: number
  amountMax?: number
  verified?: boolean
  search?: string
  take?: number
  skip?: number
}

export default createQuery<Args, Payment[]>(
  'countPaymentsByPeerId',
  (args, { db }) => {
    const postedOnMinSql = and(
      args.postedOnMin
        ? sql`${payment}.${payment.postedOn} >= ${args.postedOnMin}`
        : undefined
    )

    const postedOnMaxSql = and(
      args.postedOnMax
        ? sql`${payment}.${payment.postedOn} <= ${args.postedOnMax}`
        : undefined
    )

    const amountMinSql = and(
      R.isNil(args.amountMin) || isNaN(args.amountMin)
        ? undefined
        : sql`${payment}.${payment.amount} >= ${args.amountMin}`
    )

    const amountMaxSql = and(
      R.isNil(args.amountMax) || isNaN(args.amountMax)
        ? undefined
        : sql`${payment}.${payment.amount} <= ${args.amountMax}`
    )

    const searchSql = and(
      args.search
        ? sql`
          ${payment}.${payment.description} ilike ${`%${args.search}%`}
          or (
            ${payment}.${payment.peerId} is null
            and ${payment}.${payment.peerName} ilike ${`%${args.search}%`}
          )
          or (
            ${payment}.${payment.peerId} is not null
            and exists (
              select 1
              from ${peer}
              where ${peer}.${peer.id} = ${payment}.${payment.id}
              and ${peer}.${peer.name} ilike ${`%${args.search}%`}
            )
          )
        `
        : undefined
    )

    return db.scalar(
      sql`
        select count(*)
        from ${payment}
        where ${payment.peerId} = ${args.peerId}
        ${postedOnMinSql}
        ${postedOnMaxSql}
        ${amountMinSql}
        ${amountMaxSql}
        ${searchSql};
      `
    )
  }
)
