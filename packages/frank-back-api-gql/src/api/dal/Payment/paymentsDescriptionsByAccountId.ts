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

export default createQuery<Args, string[]>(
  'paymentsDescriptionsByAccountId',
  (args, { db }) => {
    const byDescriptionSql = and(
      args.search
        ? sql`${payment}.${payment.description} ilike ${`%${args.search}%`}`
        : undefined
    )

    const byPeerSql = and(
      args.peerId
        ? sql`${payment}.${payment.peerId} = ${args.peerId}`
        : undefined
    )

    const byCategorySql = and(
      args.categoryId
        ? sql`${payment}.${payment.categoryId} = ${args.categoryId}`
        : undefined
    )

    return db.scalars<string>(
      sql`
        select ${payment}.${payment.description}
        from ${payment}
        where ${payment}.${payment.accountId} = ${args.accountId}
        ${byDescriptionSql}
        ${byPeerSql}
        ${byCategorySql}
      `
    )
  }
)
