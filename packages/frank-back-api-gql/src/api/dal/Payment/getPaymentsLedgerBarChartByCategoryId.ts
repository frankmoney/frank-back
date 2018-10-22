import * as R from 'ramda'
import { and, sql } from 'sql'
import { payment } from 'store/names'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  categoryId: Id
  postedOnMin?: Date
  postedOnMax?: Date
  amountMin?: number
  amountMax?: number
}

export type Result = {
  items: {
    date: Date
    revenue: number
    spending: number
  }[]
}

export default createQuery<Args, Result>(
  'getPaymentsLedgerBarChartByCategoryId',
  async (args, { db }) => {
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

    const items = await db.query<{
      date: Date
      revenue: number
      spending: number
    }>(
      sql`
        select
          ${payment}.${payment.postedOn} "date",
          coalesce(sum(case when ${payment}.${
        payment.amount
      } > 0 then ${payment}.${payment.amount} else 0 end), 0) "revenue",
          -coalesce(sum(case when ${payment}.${
        payment.amount
      } < 0 then ${payment}.${payment.amount} else 0 end), 0) "spending"
        from ${payment}
        where ${payment}.${payment.categoryId} = ${args.categoryId}
        ${postedOnMinSql}
        ${postedOnMaxSql}
        ${amountMinSql}
        ${amountMaxSql}
        group by ${payment}.${payment.postedOn};
      `
    )

    return { items }
  }
)
