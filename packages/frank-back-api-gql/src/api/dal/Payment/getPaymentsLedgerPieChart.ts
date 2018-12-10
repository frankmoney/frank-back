import * as R from 'ramda'
import { and, sql, where } from 'sql'
import { CategoryType } from 'store/enums'
import { category, payment } from 'store/names'
import Id from 'store/types/Id'
import mapCategory from 'api/mappers/mapCategory'
import Category from 'api/types/Category'
import listCategoriesByIds from '../Category/listCategoriesByIds'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  wherePayment?: PaymentWhere
}

export type Result = {
  totalRevenue: number
  totalSpending: number
  items: {
    category: Category | null
    spending: number
  }[]
}

export default createQuery<Args, Result>(
  'getPaymentsLedgerPieChart',
  async (args, scope) => {
    const fromSql = sql`
      from "${payment}" p
      join "${category}" c
      on p."${payment.categoryId}" = c."${category.id}"
    `
    const wherePaymentSql = paymentPredicateSql('p', args.wherePayment)

    const totalRevenue = await scope.db.scalar<number>(
      sql`
        select
          coalesce(
            sum(
              case
                when c."${category.type}" = ${CategoryType.revenue}
                then p."${payment.amount}"
                else 0
              end
            ),
            0
          ) "totalRevenue"
        ${fromSql}
        ${where(wherePaymentSql)}
      `
    )

    const items = await scope.db.query<{
      categoryId: null | Id
      spending: number
    }>(
      sql`
        with p as (
          select
            p."${payment.amount}" "amount",
            case
              when p."${payment.verified}"
              then p."${payment.categoryId}"
              else null
            end "categoryId"
          ${fromSql}
          where c."${category.type}" = ${CategoryType.spending}
          ${and(wherePaymentSql)}
        ),
        g as (
          select "categoryId", coalesce(-sum("amount"), 0) "spending"
          from p
          group by "categoryId"
        )
        select
          "categoryId",
          case
            when "spending" > 0
            then "spending"
            else 0
          end "spending"
        from g
      `
    )

    const categoryIds = R.uniq(
      items.filter(x => x.categoryId).map(x => x.categoryId!)
    )

    const categoryModels = categoryIds.length
      ? await listCategoriesByIds({ ids: categoryIds }, scope)
      : []

    const categories = mapCategory(categoryModels)

    const categoryMap = new Map(
      categories.map(x => <[Id, Category]>[x.$source.id, x])
    )

    return {
      totalRevenue,
      totalSpending: items.reduce((r, x) => r + x.spending, 0),
      items: items.map(x => ({
        spending: x.spending,
        category: (x.categoryId && categoryMap.get(x.categoryId)) || null,
      })),
    }
  }
)
