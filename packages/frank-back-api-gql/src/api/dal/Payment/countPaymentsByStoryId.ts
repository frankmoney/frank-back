import { and, sql } from 'sql'
import { payment, storyPayment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  storyId: Id
  where?: PaymentWhere
}

export default createQuery<Args, number>(
  'countPaymentsByStoryId',
  (args, { db }) =>
    db.scalar(
      sql`
        select count(*)
        from "${storyPayment}" sp
        join "${payment}" p
        on sp."${storyPayment.paymentId}" = p."${payment.id}"
        where sp."${storyPayment.storyId}" = ${args.storyId}
        ${and(paymentPredicateSql('p', args.where))}
      `
    )
)
