import { and, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment, storyPayment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentFieldsSql from './helpers/paymentFieldsSql'
import paymentOrderBySql from './helpers/paymentOrderBySql'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  storyId: Id
  where?: PaymentWhere
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listPaymentsByStoryId',
  (args, { db }) =>
    db.query(
      sql`
        select ${paymentFieldsSql('p')}
        from "${storyPayment}" sp
        join "${payment}" p
        on sp."${storyPayment.paymentId}" = p."${payment.id}"
        where sp."${storyPayment.storyId}" = ${args.storyId}
        ${and(paymentPredicateSql('p', args.where))}
        order by ${paymentOrderBySql('p', args.orderBy)}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
)
