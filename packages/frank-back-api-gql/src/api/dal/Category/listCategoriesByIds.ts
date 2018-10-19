import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'

export type Args = {
  ids: Id[]
}

export default createQuery<Args, Category[]>(
  'listCategoriesByIds',
  (args, { db }) => {
    return db.query(
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
        where ${category.id} in (${args.ids});
      `,
      mapCategory
    )
  }
)
