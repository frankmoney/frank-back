import { Sql, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment, storyDraftPayment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'

export type Args = {
  draftId: Id
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listPaymentsByStoryDraftId',
  (args, { db }) => {
    let orderBySql: Sql

    switch (args.orderBy) {
      case 'postedOn_DESC':
        orderBySql = sql`${payment}.${payment.postedOn} desc`
        break
      case 'amount_DESC':
        orderBySql = sql`${payment}.${payment.amount} desc`
        break
      default:
        throw new Error(`Unknown payment order: ${args.orderBy}`)
    }

    return db.query(
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
          ${payment}.${payment.categoryId}
        from ${payment}
        join ${storyDraftPayment}
        on ${payment}.${payment.id} = ${storyDraftPayment}.${
        storyDraftPayment.paymentId
      }
        where ${storyDraftPayment.storyDraftId} = ${args.draftId}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
  }
)
