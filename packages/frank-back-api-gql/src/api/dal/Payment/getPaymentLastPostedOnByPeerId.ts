import { sql } from 'sql'
import { payment } from 'store/names'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
}

export default createQuery<Args, Date | null>(
  'getPaymentLastPostedOnByPeerId',
  async (args, { db }) =>
    (await db.scalar<Date>(
      sql`
        select max(${payment}.${payment.postedOn})
        from ${payment}
        where ${payment.peerId} = ${args.peerId};
      `
    )) || null
)
