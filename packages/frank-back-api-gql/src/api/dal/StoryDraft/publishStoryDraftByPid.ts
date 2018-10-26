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
        join ${account}
        on ${story}.${story.accountId} = ${account}.${account.id}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.roleId} in (${[TeamMemberRole.administrator, TeamMemberRole.manager]})
        and ${storyDraft}.${storyDraft.storyId} = ${story}.${story.id}
        and ${storyDraft}.${storyDraft.pid} = ${args.pid};
      `
    )

    if (storyId) {
      await db.command(
        sql`
          update ${storyDraft}
          set ${storyDraft.publishedAt} = now() at time zone 'utc'
          where ${storyDraft}.${storyDraft.pid} = ${args.pid};
        `
      )
    }

    return storyId
  }
)
