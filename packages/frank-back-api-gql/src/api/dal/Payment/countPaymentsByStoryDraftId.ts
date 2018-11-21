import { and, sql } from 'sql'
import { payment, storyDraftPayment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  draftId: Id
  where?: PaymentWhere
}

export default createQuery<Args, number>(
  'countPaymentsByStoryDraftId',
  (args, { db }) =>
    db.scalar(
      sql`
        select count(*)
        from "${storyDraftPayment}" sdp
        join "${payment}" p
        on sdp."${storyDraftPayment.paymentId}" = p."${payment.id}"
        where sdp."${storyDraftPayment.storyDraftId}" = ${args.draftId}
        ${and(paymentPredicateSql('p', args.where))}
      `
    )
)
