import { and, limit, sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import categoryFieldsSql from './helpers/categoryFieldsSql'

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
        ? sql`c.${category.name} ilike ${`%${args.search}%`}`
        : undefined
    )

    return db.query(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        where c.${category.accountId} = ${args.accountId}
        ${searchSql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapCategory
    )
  }
)
