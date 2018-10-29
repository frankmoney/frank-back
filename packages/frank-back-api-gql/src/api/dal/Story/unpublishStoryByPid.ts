import { sql } from 'sql'
import { TeamMemberRole } from 'store/enums'
import { account, story, storyDraft, teamMember } from 'store/names'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  pid: Pid
}

export default createMutation<Args, undefined | null | Id>(
  'unpublishStoryByPid',
  async (args, { db }) => {
    const storyId = await db.scalar(
      sql`
        update ${story}
        set
          ${story.updatedAt} = now() at time zone 'utc',
          ${story.updaterId} = ${args.userId},
          ${story.publishedAt} = null
        from ${account}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${story}.${story.accountId} = ${account}.${account.id}
        and ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.roleId} in (
          ${TeamMemberRole.administrator}, ${TeamMemberRole.manager}
        )
        and ${story}.${story.pid} = ${args.pid}
        returning ${story}.${story.id};
      `
    )

    if (storyId) {
      await db.command(
        sql`
          update ${storyDraft}
          set
            ${storyDraft.updatedAt} = now() at time zone 'utc',
            ${storyDraft.updaterId} = ${args.userId},
            ${storyDraft.publishedAt} = null
          where ${storyDraft}.${storyDraft.storyId} = ${storyId};
        `
      )
    }

    return storyId
  }
)
