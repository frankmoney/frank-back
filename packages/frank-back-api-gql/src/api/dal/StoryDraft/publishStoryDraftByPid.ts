import { sql } from 'sql'
import { TeamMemberRole } from 'store/enums'
import {
  account,
  story,
  storyDraft,
  storyDraftPayment,
  storyPayment,
  teamMember,
} from 'store/names'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  pid: Pid
}

export default createMutation<Args, undefined | null | Id>(
  'publishStoryDraftByPid',
  async (args, { db }) => {
    const storyId = await db.scalar(
      sql`
        update ${story}
        set
          ${story.updatedAt} = now() at time zone 'utc',
          ${story.updaterId} = ${args.userId},
          ${story.publishedAt} = now() at time zone 'utc',
          ${story.title} = ${storyDraft}.${storyDraft.title},
          ${story.cover} = ${storyDraft}.${storyDraft.cover},
          ${story.body} = ${storyDraft}.${storyDraft.body}
        from ${storyDraft}
        cross join ${account}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${story}.${story.accountId} = ${account}.${account.id}
        and ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.roleId} in (
          ${TeamMemberRole.administrator}, ${TeamMemberRole.manager}
        )
        and ${storyDraft}.${storyDraft.storyId} = ${story}.${story.id}
        and ${storyDraft}.${storyDraft.pid} = ${args.pid}
        returning ${story}.${story.id};
      `
    )

    if (storyId) {
      await db.command(
        sql`
          delete from ${storyPayment}
          where ${storyPayment.storyId} = ${storyId};
        `
      )

      await db.command(
        sql`
          insert into
            ${storyPayment} (
              ${storyPayment.creatorId},
              ${storyPayment.storyId},
              ${storyPayment.paymentId}
            )
          select
            ${args.userId},
            ${storyId},
            "${storyDraftPayment}"."${storyDraftPayment.paymentId}"
          from "${storyDraftPayment}"
          join "${storyDraft}"
          on "${storyDraftPayment}"."${storyDraftPayment.storyDraftId}"
            = "${storyDraft}"."${storyDraft.pid}"
          where "${storyDraft}"."${storyDraft.pid}" = ${args.pid};
        `
      )

      const draftId = await db.scalar(
        sql`
          update ${storyDraft}
          set
            ${storyDraft.updatedAt} = now() at time zone 'utc',
            ${storyDraft.updaterId} = ${args.userId},
            ${storyDraft.publishedAt} = now() at time zone 'utc'
          where ${storyDraft}.${storyDraft.pid} = ${args.pid}
          returning ${storyDraft}.${storyDraft.id};
        `
      )

      return draftId
    }

    return null
  }
)
