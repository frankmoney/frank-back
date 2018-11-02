import { join, nullIfEmpty, sql } from 'sql'
import { TeamMemberRole } from 'store/enums'
import {
  account, payment,
  story,
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
  pid: Pid
  title?: null | string
  cover?: null | Json
  body?: null | Json
  paymentPids?: null | Pid[]
}

export default createMutation<Args, undefined | null | Id>(
  'updateStoryDraftByPid',
  async (args, { db }) => {
    const draftId = await db.scalar<undefined | null | Id>(
      sql`
        update ${storyDraft}
        set
          ${storyDraft.updatedAt} = now() at time zone 'utc',
          ${storyDraft.updaterId} = ${args.userId},
          ${storyDraft.title} = ${nullIfEmpty(args.title)},
          ${storyDraft.cover} = ${args.cover},
          ${storyDraft.body} = ${args.body}
        from ${story}
        join ${account}
        on ${story}.${story.accountId} = ${account}.${account.id}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.roleId}
          in (${TeamMemberRole.administrator}, ${TeamMemberRole.manager})
        and ${storyDraft}.${storyDraft.storyId} = ${story}.${story.id}
        and ${storyDraft}.${storyDraft.pid} = ${args.pid}
        and ${story}.${story.id} = ${storyDraft}.${storyDraft.storyId}
        returning ${storyDraft}.${storyDraft.id};
      `
    )

    if (draftId) {
      await db.command(
        sql`
          delete from ${storyDraftPayment}
          where ${storyDraftPayment}.${
            storyDraftPayment.storyDraftId
          } = ${draftId}
        `
      )

      if (args.paymentPids && args.paymentPids.length > 0) {
        await db.command(
          sql`
            insert into
              ${storyDraftPayment} (
                ${storyDraftPayment.creatorId},
                ${storyDraftPayment.storyDraftId},
                ${storyDraftPayment.paymentId}
              )
            select
              ${args.userId},
              ${draftId},
              "${payment}"."${payment.id}"
            from ${payment}
            where ${payment}.${payment.pid} in (${args.paymentPids});
          `
        )
      }
    }

    return draftId
  }
)
