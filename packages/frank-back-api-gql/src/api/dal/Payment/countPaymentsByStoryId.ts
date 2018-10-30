import { sql } from 'sql'
import { storyPayment } from 'store/names'
import Payment from 'store/types/Payment'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  storyId: Id
}

export default createQuery<Args, number>(
  'countPaymentsByStoryId',
  (args, { db }) =>
    db.scalar(
      sql`
        select count(*)
        from ${storyPayment}
        where ${storyPayment.storyId} = ${args.storyId};
      `
    )
)
