import { and, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  amount?: number
  peerId?: Id | null
  categoryId?: Id | null
  description?: Id | null
}

export default createQuery<Args, Payment | undefined>(
  'lastPublishedPaymentByAccountId',
  (args, { db }) => {
    const byAmountSql = and(
      args.amount
        ? sql`${payment}.${payment.amount} = ${args.amount}`
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

    const byDescriptionSql = and(
      args.description
        ? sql`${payment}.${payment.description} = ${args.description}`
        : undefined
    )

    const orderBySql = sql`${payment}.${payment.postedOn} desc`

    return db.first(
      sql`
        select
          ${payment}.${payment.id},
          ${payment}.${payment.pid},
          ${payment}.${payment.createdAt},
          ${payment}.${payment.creatorId},
          ${payment}.${payment.updatedAt},
          ${payment}.${payment.updaterId},
          ${payment}.${payment.data},
          ${payment}.${payment.postedOn},
          ${payment}.${payment.amount},
          ${payment}.${payment.peerName},
          ${payment}.${payment.description},
          ${payment}.${payment.accountId},
          ${payment}.${payment.peerId},
          ${payment}.${payment.categoryId},
          ${payment}.${payment.peerUpdaterId},
          ${payment}.${payment.categoryUpdaterId},
          ${payment}.${payment.descriptionUpdaterId}
        from ${payment}
        where ${payment}.${payment.accountId} = ${args.accountId} 
        and ${payment}.${payment.published} = TRUE
        ${byAmountSql}
        ${byPeerSql}
        ${byCategorySql}
        ${byDescriptionSql}
        order by ${orderBySql}
        limit 1;
      `,
      mapPayment
    )
  }
)
