import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'

export type Args = {
  paymentId: Id
}

export default createQuery<Args, Category>(
  'getCategoryByPaymentId',
  (args, { db }) =>
    db.first(
      sql`
        select
          ${category}.${category.id},
          ${category}.${category.pid},
          ${category}.${category.createdAt},
          ${category}.${category.creatorId},
          ${category}.${category.updatedAt},
          ${category}.${category.updaterId},
          ${category}.${category.name},
          ${category}.${category.color},
          ${category}.${category.accountId}
        from ${category}
        join ${payment}
        on ${category}.${category.id} = ${payment}.${payment.categoryId}
        where ${payment}.${payment.id} = ${args.paymentId};
      `,
      mapCategory
    )
)
