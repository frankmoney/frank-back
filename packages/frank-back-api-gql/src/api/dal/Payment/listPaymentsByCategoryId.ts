import * as R from 'ramda'
import { Sql, and, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment, peer } from 'store/names'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'

export type Args = {
  categoryId: Id
  postedOnMin?: Date
  postedOnMax?: Date
  amountMin?: number
  amountMax?: number
  verified?: boolean
  search?: string
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listPaymentsByCategoryId',
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

    const verifiedSql = and(
      args.verified === undefined
        ? undefined
        : sql`${payment}.${payment.verified} = ${args.verified}`
    )

    let orderBySql: Sql

    switch (args.orderBy) {
      case 'postedOn_ASC':
        orderBySql = sql`${payment}.${payment.postedOn} asc`
        break
      case 'postedOn_DESC':
        orderBySql = sql`${payment}.${payment.postedOn} desc`
        break
      case 'amount_DESC':
        orderBySql = sql`${payment}.${payment.amount} desc`
        break
      default:
        throw new Error(`Unknown payment order: ${args.orderBy}`)
    }

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

    return db.query(
      sql`
        select
          ${payment}.${payment.id},
          ${payment}.${payment.pid},
          ${payment}.${payment.createdAt},
          ${payment}.${payment.creatorId},
          ${payment}.${payment.updatedAt},
          ${payment}.${payment.updaterId},
          ${payment}.${payment.data},
          ${payment}.${payment.postedOn},
          ${payment}.${payment.amount},
          ${payment}.${payment.peerName},
          ${payment}.${payment.description},
          ${payment}.${payment.verified},
          ${payment}.${payment.accountId},
          ${payment}.${payment.peerId},
          ${payment}.${payment.categoryId}
        from ${payment}
        where ${payment.categoryId} = ${args.categoryId}
        ${postedOnMinSql}
        ${postedOnMaxSql}
        ${amountMinSql}
        ${amountMaxSql}
        ${verifiedSql}
        ${searchSql}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
  }
)
