import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import paymentFieldsSql from './helpers/paymentFieldsSql'

export type Args = {
  accountId: Id
  pid: Pid
}

export default createQuery<Args, Payment>(
  'getPaymentByPidAndAccountId',
  (args, { db }) =>
    db.first(
      sql`
        select ${paymentFieldsSql('p')}
        from "${payment}" p
        where p."${payment.accountId}" = ${args.accountId}
        and p."${payment.pid}" = ${args.pid}
      `,
      mapPayment
    )
)
