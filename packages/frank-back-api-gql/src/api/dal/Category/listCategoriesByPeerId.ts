import { and, limit, sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import categoryFieldsSql from './helpers/categoryFieldsSql'

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
        ? sql`c.${category.name} ilike ${`%${args.search}%`}`
        : undefined
    )

    return db.query(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.categoryId} = c.${category.id}
          and ${payment}.${payment.peerId} = ${args.peerId}
        )
        ${searchSql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapCategory
    )
  }
)
