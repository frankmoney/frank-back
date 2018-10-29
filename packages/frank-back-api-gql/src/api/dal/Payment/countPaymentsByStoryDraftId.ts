import { sql } from 'sql'
import { storyDraftPayment } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  draftId: Id
}

export default createQuery<Args, number>(
  'countPaymentsByStoryDraftId',
  (args, { db }) =>
    db.scalar(
      sql`
        select count(*)
        from ${storyDraftPayment}
        where ${storyDraftPayment.storyDraftId} = ${args.draftId};
      `
    )
)
