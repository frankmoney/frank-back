import * as R from 'ramda'
import { and, sql, where } from 'sql'
import { payment } from 'store/names'
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
  items: {
    category: Category | null
    revenue: number
    spending: number
  }[]
}

export default createQuery<Args, Result>(
  'getPaymentsLedgerPieChart',
  async (args, scope) => {
    const data = await scope.db.query<{
      categoryId?: Id
      revenue: number
      spending: number
    }>(
      sql`
        select
          case
            when p."${payment.verified}"
            then "${payment.categoryId}"
            else null
          end "categoryId",
          coalesce(
            sum(
              case
                when p."${payment.amount}" > 0
                then p."${payment.amount}"
                else 0
              end
            ),
            0
          ) "revenue",
          -coalesce(
            sum(
              case
                when p."${payment.amount}" < 0
                then p."${payment.amount}"
                else 0
              end
            ),
            0
          ) "spending"
        from "${payment}" p
        ${where(paymentPredicateSql('p', args.wherePayment))}
        group by
          case
            when p."${payment.verified}"
            then p."${payment.categoryId}"
            else null
          end "categoryId"
      `
    )

    const categoryIds = data.filter(x => x.categoryId).map(x => x.categoryId!)

    const categoryModels = categoryIds.length
      ? await listCategoriesByIds({ ids: categoryIds }, scope)
      : []

    const categories = mapCategory(categoryModels)

    const items = data.map(x => ({
      category: R.find(y => y.$source.id === x.categoryId, categories) || null,
      revenue: x.revenue,
      spending: x.spending,
    }))

    return { items }
  }
)
