import { sql } from 'sql'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
}

export default createQuery<Args, number>(
  'countPaymentsTotalByAccountId',
  (args, { db }) => {
    const count = db.scalar<number>(
      sql`
        select coalesce(sum(${payment}.${payment.amount}), 0)
        from ${payment}
        where ${payment}.${payment.accountId} = ${args.accountId}
      `
    )

    return count
  }
)