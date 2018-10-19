import { and, limit, sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
  search?: string
  take?: number
  skip?: number
}

export default createQuery<Args, Category[]>(
  'listCategoriesByPeerId',
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
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.categoryId} = ${category}.${category.id}
          and ${payment}.${payment.peerId} = ${args.peerId}
        )
        ${searchSql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapCategory
    )
  }
)
