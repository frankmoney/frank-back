import { sql } from 'sql'
import { payment } from 'store/names'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'

export type Args = {
  paymentPid: Pid
}

export default createQuery<Args, number>(
  'countSimilarPaymentsByPid',
  (args, { db }) => {
    return db.scalar<number>(
      sql`
        select count(*)
        from ${payment}
        join ${payment} other
        on ${payment}.${payment.peerId} = other.${payment.peerId}
        and ${payment}.${payment.categoryId} = other.${payment.categoryId}
        and ${payment}.${payment.id} != other.${payment.id}
        where ${payment}.${payment.pid} = ${args.paymentPid}
      `
    )
  }
)
