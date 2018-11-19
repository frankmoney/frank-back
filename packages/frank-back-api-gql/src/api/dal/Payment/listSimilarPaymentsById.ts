import * as R from 'ramda'
import { Sql, and, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment, peer } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'

export type Args = {
  id: Id
  postedOnMin?: Date
  postedOnMax?: Date
  amountMin?: number
  amountMax?: number
  verified?: boolean
  published?: boolean
  search?: string
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listSimilarPaymentsById',
  (args, { db }) => {
    const postedOnMinSql = and(
      args.postedOnMin
        ? sql`"other"."${payment.postedOn}" >= ${args.postedOnMin}`
        : undefined
    )

    const postedOnMaxSql = and(
      args.postedOnMax
        ? sql`"other"."${payment.postedOn}" <= ${args.postedOnMax}`
        : undefined
    )

    const amountMinSql = and(
      R.isNil(args.amountMin) || isNaN(args.amountMin)
        ? undefined
        : sql`"other"."${payment.amount}" >= ${args.amountMin}`
    )

    const amountMaxSql = and(
      R.isNil(args.amountMax) || isNaN(args.amountMax)
        ? undefined
        : sql`"other"."${payment.amount}" <= ${args.amountMax}`
    )

    const verifiedSql = and(
      args.verified === undefined
        ? undefined
        : sql`"other"."${payment.verified}" = ${args.verified}`
    )

    const publishedSql = and(
      args.published === undefined
        ? undefined
        : sql`"other"."${payment.published}" = ${args.published}`
    )

    const searchSql = and(
      args.search
        ? sql`
          "other"."${payment.description}" ilike ${`%${args.search}%`}
          or (
            "other"."${payment.peerId}" is null
            and "other"."${payment.peerName}" ilike ${`%${args.search}%`}
          )
          or (
            "other"."${payment.peerId}" is not null
            and exists (
              select 1
              from "${peer}"
              where "${peer}"."${peer.id}" = "other"."${payment.id}"
              and "${peer}"."${peer.name}" ilike ${`%${args.search}%`}
            )
          )
        `
        : undefined
    )

    let orderBySql: Sql

    switch (args.orderBy) {
      case 'postedOn_ASC':
        orderBySql = sql`"other"."${payment.postedOn}" asc`
        break
      case 'postedOn_DESC':
        orderBySql = sql`"other"."${payment.postedOn}" desc`
        break
      case 'amount_DESC':
        orderBySql = sql`"other"."${payment.amount}" desc`
        break
      default:
        throw new Error(`Unknown payment order: ${args.orderBy}`)
    }

    return db.query(
      sql`
        select
          "other"."${payment.id}",
          "other"."${payment.pid}",
          "other"."${payment.createdAt}",
          "other"."${payment.creatorId}",
          "other"."${payment.updatedAt}",
          "other"."${payment.updaterId}",
          "other"."${payment.data}",
          "other"."${payment.postedOn}",
          "other"."${payment.amount}",
          "other"."${payment.peerName}",
          "other"."${payment.description}",
          "other"."${payment.verified}",
          "other"."${payment.published}",
          "other"."${payment.accountId}",
          "other"."${payment.peerId}",
          "other"."${payment.categoryId}"
        from "${payment}" "this"
        join "${payment}" "other"
        on "this"."${payment.categoryId}" = "other"."${payment.categoryId}"
        and "this"."${payment.peerId}" = "other"."${payment.peerId}"
        and "this"."${payment.id}" <> "other"."${payment.id}"
        where "this"."${payment.id}" = ${args.id}
        ${postedOnMinSql}
        ${postedOnMaxSql}
        ${amountMinSql}
        ${amountMaxSql}
        ${verifiedSql}
        ${publishedSql}
        ${searchSql}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
  }
)
