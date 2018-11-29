import { and, sql } from 'sql'
import { category } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  search?: string
  take?: number
  skip?: number
  type?: string
}

export default createQuery<Args, number>(
  'countCategoriesByAccountId',
  (args, { db }) => {
    const searchSql = and(
      args.search
        ? sql`${category.name} ilike ${`%${args.search}%`}`
        : undefined
    )

    const typeSql = and(
      args.type ? sql`${category.type} = ${args.type}` : undefined
    )

    return db.scalar(
      sql`
        select count(*)
        from ${category}
        where ${category.accountId} = ${args.accountId}
        ${searchSql}
        ${typeSql};
      `
    )
  }
)
