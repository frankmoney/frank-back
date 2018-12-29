import { limit, orderBy, sql, where } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import PaymentsOrder from 'store/types/PaymentsOrder'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentFieldsSql from './helpers/paymentFieldsSql'
import paymentOrderBySql from './helpers/paymentOrderBySql'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  where?: PaymentWhere
  take?: number
  skip?: number
  orderBy?: PaymentsOrder
}

export default createQuery<Args, Payment[]>('listPayments', (args, { db }) =>
  db.query(
    sql`
      select ${paymentFieldsSql('p')}
      from "${payment}" p
      ${where(paymentPredicateSql('p', args.where))}
      ${orderBy(paymentOrderBySql('p', args.orderBy))}
      ${limit({ take: args.take, skip: args.skip })};
    `,
    mapPayment
  )
)
