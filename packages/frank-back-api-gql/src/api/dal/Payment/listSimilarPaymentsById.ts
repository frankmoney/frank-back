import { and, limit, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentFieldsSql from './helpers/paymentFieldsSql'
import paymentOrderBySql from './helpers/paymentOrderBySql'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  id: Id
  where?: PaymentWhere
  take?: number
  skip?: number
  orderBy: PaymentsOrder
}

export default createQuery<Args, Payment[]>(
  'listSimilarPaymentsById',
  (args, { db }) =>
    db.query(
      sql`
        select ${paymentFieldsSql('o')}
        from "${payment}" t
        join "${payment}" o
        on t."${payment.categoryId}" = o."${payment.categoryId}"
        and t."${payment.peerId}" = o."${payment.peerId}"
        and t."${payment.id}" <> o."${payment.id}"
        where t."${payment.id}" = ${args.id}
        ${and(paymentPredicateSql('o', args.where))}
        order by ${paymentOrderBySql('o', args.orderBy)}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPayment
    )
)
