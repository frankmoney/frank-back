import { Sql, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment, storyPayment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'

export type Args = {
  storyId: Id
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listPaymentsByStoryId',
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
        throw new Error(`Unknown peer order: ${args.orderBy}`)
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
        join ${storyPayment}
        on ${payment}.${payment.id} = ${storyPayment}.${storyPayment.paymentId}
        where ${storyPayment.storyId} = ${args.storyId}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
  }
)
