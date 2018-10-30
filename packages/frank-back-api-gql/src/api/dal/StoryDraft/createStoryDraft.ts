import { nullIfEmpty, sql } from 'sql'
import {
  account,
  payment,
  storyDraft,
  storyDraftPayment,
  teamMember,
} from 'store/names'
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
    const draftId = await db.scalar(
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
      await db.command(
        sql`
          insert into
            ${storyDraftPayment} (
              ${storyDraftPayment.storyDraftId},
              ${storyDraftPayment.paymentId}
            )
          select ${draftId}, ${payment}.${payment.id}
          from ${payment}
          join ${account}
          on ${payment}.${payment.accountId} = ${account}.${account.id}
          join ${teamMember}
          on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
          where ${teamMember}.${teamMember.userId} = ${args.userId}
          and ${payment}.${payment.pid} in ( ${args.paymentPids} );
        `
      )
    }

    return draftId
  }
)
