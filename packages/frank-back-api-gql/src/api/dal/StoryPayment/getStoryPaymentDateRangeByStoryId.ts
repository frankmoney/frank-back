import { sql } from 'sql'
import { payment, storyPayment } from 'store/names'
import DateTime from 'store/types/DateTime'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  storyId: Id
}

export default createQuery<Args, null | DateTime[]>(
  'getStoryPaymentDateRangeByStoryId',
  (args, { db }) =>
    db.first(
      sql`
        select
          min(${payment}.${payment.postedOn}) "postedOnMin",
          max(${payment}.${payment.postedOn}) "postedOnMax"
        from ${storyPayment}
        join ${payment}
        on ${storyPayment}.${storyPayment.paymentId} = ${payment}.${payment.id}
        where ${storyPayment}.${storyPayment.storyId} = ${args.storyId};
      `,
      x =>
        x && x.postedOnMin && x.postedOnMax
          ? [x.postedOnMin, x.postedOnMax]
          : null
    )
)
