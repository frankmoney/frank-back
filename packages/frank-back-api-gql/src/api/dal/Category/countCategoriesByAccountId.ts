import createQuery from 'api/dal/createQuery'
import { and, sql } from 'sql'
import { category } from 'store/names'
import Id from 'store/types/Id'

export type Args = {
  accountId: Id
  search?: string
  take?: number
  skip?: number
}

export default createQuery<Args, number>(
  'countCategoriesByAccountId',
  (args, { db }) => {
    const searchSql = and(
      args.search
        ? sql`${category.name} ilike ${`%${args.search}%`}`
        : undefined
    )

    return db.scalar(
      sql`
        select count(*)
        from ${category}
        where ${category.accountId} = ${args.accountId}
        ${searchSql};
      `
    )
  }
)
