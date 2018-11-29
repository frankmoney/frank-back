import { and, sql } from 'sql'
import { CategoryType } from 'store/enums'
import { category, payment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
  search?: string
  type?: CategoryType
}

export default createQuery<Args, number>(
  'countCategoriesByPeerId',
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
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.categoryId} = ${category}.${category.id}
          and ${payment}.${payment.peerId} = ${args.peerId}
        )
        ${searchSql}
        ${typeSql};
      `
    )
  }
)
