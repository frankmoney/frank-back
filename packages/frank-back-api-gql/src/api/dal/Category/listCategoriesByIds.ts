import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import categoryFieldsSql from './helpers/categoryFieldsSql'

export type Args = {
  ids: Id[]
}

export default createQuery<Args, Category[]>(
  'listCategoriesByIds',
  (args, { db }) => {
    return db.query(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        where c.${category.id} in (${args.ids});
      `,
      mapCategory
    )
  }
)
