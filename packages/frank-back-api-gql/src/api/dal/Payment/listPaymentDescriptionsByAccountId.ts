import { sql, and } from 'sql'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  search?: string
  peerId?: Id
  categoryId?: Id
}


export default createQuery<Args, { description: string; count: number }[]>(
  'listPaymentDescriptionsByAccountId',
  (args, { db }) => {
    const byDescriptionSql = and(
      args.search
        ? sql`${payment}.${payment.description} ilike ${`%${args.search}%`}`
        : undefined,
    )

    const byPeerSql = and(
      args.peerId
        ? sql`${payment}.${payment.peerId} = ${args.peerId}`
        : undefined,
    )

    const byCategorySql = and(
      args.categoryId
        ? sql`${payment}.${payment.categoryId} = ${args.categoryId}`
        : undefined,
    )

    return db.query<{ description: string; count: number }>(
      sql`
        select ${payment.description} "description", count(*) "count"
        from ${payment}
        where ${payment}.${payment.accountId} = ${args.accountId}
        ${byDescriptionSql}
        ${byPeerSql}
        ${byCategorySql}
        group by ${payment.description}
        order by count(*) desc
      `,
    )
  },
)
