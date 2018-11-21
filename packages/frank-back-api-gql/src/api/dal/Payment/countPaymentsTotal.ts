import { sql, where } from 'sql'
import { payment } from 'store/names'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  where: PaymentWhere
}

export default createQuery<Args, number>(
  'countPaymentsTotal',
  (args, { db }) => {
    const count = db.scalar<number>(
      sql`
        select coalesce(sum(p."${payment.amount}"), 0)
        from "${payment}" p
        ${where(paymentPredicateSql('p', args.where))}
      `
    )

    return count
  }
)
