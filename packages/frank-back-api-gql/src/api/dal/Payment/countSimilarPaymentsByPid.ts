import { and, sql } from 'sql'
import { payment } from 'store/names'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  paymentPid: Pid
  where?: PaymentWhere
}

export default createQuery<Args, number>(
  'countSimilarPaymentsByPid',
  (args, { db }) => {
    return db.scalar<number>(
      sql`
        select count(*)
        from "${payment}" t
        join "${payment}" o
        on t."${payment.categoryId}" = o."${payment.categoryId}"
        and t."${payment.peerId}" = o."${payment.peerId}"
        and t."${payment.id}" <> o."${payment.id}"
        where t."${payment.pid}" = ${args.paymentPid}
        ${and(paymentPredicateSql('other', args.where))}
      `
    )
  }
)
