import { sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
  pid: Pid
}

export default createQuery<Args, Payment>(
  'getPaymentByPidAndPeerId',
  (args, { db }) =>
    db.first(
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
        where ${payment.peerId} = ${args.peerId}
        and ${payment.pid} = ${args.pid};
      `,
      mapPayment
    )
)
