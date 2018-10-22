import * as R from 'ramda'
import { and, sql } from 'sql'
import { payment } from 'store/names'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import mapCategory from 'api/mappers/mapCategory'
import Category from 'api/types/Category'
import listCategoriesByIds from '../Category/listCategoriesByIds'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  postedOnMin?: Date
  postedOnMax?: Date
}

export type Result = {
  items: {
    category: Category | null
    revenue: number
    spending: number
  }[]
}

export default createQuery<Args, Result>(
  'getPaymentsLedgerPieChartByAccountId',
  async (args, scope) => {
    const { db } = scope

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

    const data = await db.query<{
      categoryId?: Id
      revenue: number
      spending: number
    }>(
      sql`
        select
          ${payment}.${payment.categoryId} "categoryId",
          coalesce(sum(case when ${payment}.${
        payment.amount
      } > 0 then ${payment}.${payment.amount} else 0 end), 0) "revenue",
          -coalesce(sum(case when ${payment}.${
        payment.amount
      } < 0 then ${payment}.${payment.amount} else 0 end), 0) "spending"
        from ${payment}
        where ${payment}.${payment.accountId} = ${args.accountId}
        ${postedOnMinSql}
        ${postedOnMaxSql}
        group by ${payment}.${payment.categoryId}
      `
    )

    const categoryIds = data.filter(x => x.categoryId).map(x => x.categoryId!)
    const categoryModels =
      (categoryIds.length &&
        (await listCategoriesByIds({ ids: categoryIds }, scope))) ||
      []
    const categories = mapCategory(categoryModels)

    const items = data.map(x => ({
      category: R.find(y => y.$source.id === x.categoryId, categories) || null,
      revenue: x.revenue,
      spending: x.spending,
    }))

    return { items }
  }
)
