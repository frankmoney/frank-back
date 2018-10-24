import { sql } from 'sql'
import { payment, storyDraftPayment } from 'store/names'
import DateTime from 'store/types/DateTime'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  draftId: Id
}

export default createQuery<Args, null | DateTime[]>(
  'getStoryDraftPaymentDateRangeByStoryId',
  (args, { db }) => db.first(
      sql`
        select
          min(${payment}.${payment.postedOn}) postedOnMin,
          max(${payment}.${payment.postedOn}) postedOnMax
        from ${storyDraftPayment}
        join ${payment}
        on ${storyDraftPayment}.${storyDraftPayment.paymentId} = ${payment}.${payment.id}
        where ${storyDraftPayment}.${storyDraftPayment.storyDraftId} = ${args.draftId};
      `,
      x => x ? [x.postedOnMin, x.postedOnMax] : null
    )
)
