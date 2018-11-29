import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import categoryFieldsSql from './helpers/categoryFieldsSql'

export type Args = {
  paymentId: Id
}

export default createQuery<Args, Category>(
  'getCategoryByPaymentId',
  (args, { db }) =>
    db.first(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        join ${payment}
        on c.${category.id} = ${payment}.${payment.categoryId}
        where ${payment}.${payment.id} = ${args.paymentId};
      `,
      mapCategory
    )
)
