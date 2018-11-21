import { sql, where } from 'sql'
import { payment } from 'store/names'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  where: PaymentWhere
}

export default createQuery<Args, number>('countPayments', (args, { db }) =>
  db.scalar(
    sql`
      select count(*)
      from "${payment}" p
      ${where(paymentPredicateSql('p', args.where))}
    `
  )
)
