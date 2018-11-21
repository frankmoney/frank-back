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
        select max(p."${payment.postedOn}")
        from "${payment}" p
        where p."${payment.peerId}" = ${args.peerId}
      `
    )) || null
)
