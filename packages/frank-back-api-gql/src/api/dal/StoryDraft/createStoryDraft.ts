import { join, nullIfEmpty, sql } from 'sql'
import { storyDraft, storyDraftPayment } from 'store/names'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import Pid from 'store/types/Pid'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  storyId: Id
  title?: null | string
  cover?: null | Json
  body?: null | Json
  paymentPids?: null | Pid[]
}

export default createMutation<Args, Id>(
  'createStoryDraft',
  async (args, { db }) => {
    const draftId = db.scalar(
      sql`
        insert into
          ${storyDraft} (
            ${storyDraft.creatorId},
            ${storyDraft.storyId},
            ${storyDraft.title},
            ${storyDraft.cover},
            ${storyDraft.body}
          )
        values
          (
            ${args.userId},
            ${args.storyId},
            ${nullIfEmpty(args.title)},
            ${args.cover},
            ${args.body}
          )
        returning
          ${storyDraft}.${storyDraft.id};
      `
    )

    if (draftId && args.paymentPids && args.paymentPids.length > 0) {
      const paymentSqls = args.paymentPids.map(
        paymentId => sql`( ${draftId}, ${paymentId} )`
      )

      await db.command(
        sql`
          insert into
            ${storyDraftPayment} (
              ${storyDraftPayment.storyDraftId},
              ${storyDraftPayment.paymentId}
            )
          values
            ${join(paymentSqls, ',\n            ')};
        `
      )
    }

    return draftId
  }
)
