import createQuery from 'api/dal/createQuery'
import { and, limit, sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'

export type Args = {
  accountId: Id
  search?: string
  take?: number
  skip?: number
}

export default createQuery<Args, Category[]>(
  'listCategoriesByAccountId',
  (args, { db }) => {
    const searchSql = and(
      args.search
        ? sql`${category.name} ilike ${`%${args.search}%`}`
        : undefined
    )

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
        where ${category.accountId} = ${args.accountId}
        ${searchSql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapCategory
    )
  }
)
