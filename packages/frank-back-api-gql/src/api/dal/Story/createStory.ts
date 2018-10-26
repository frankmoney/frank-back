import { sql } from 'sql'
import { account, story, teamMember } from 'store/names'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  accountPid: Pid
}

export default createMutation<Args, null | Id>(
  'createStory',
  async (args, { db }) => {
    const accountId = await db.scalar<undefined | Id>(
      sql`
        select ${account}.${account.id}
        from ${account}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${account}.${account.pid} = ${args.accountPid};
      `
    )

    if (!accountId) {
      return null
    }

    const storyId = await db.scalar<Id>(
      sql`
        insert into
          ${story} (
            ${story.creatorId},
            ${story.accountId}
          )
        values
          (
            ${args.userId},
            ${accountId}
          )
        returning
          ${story}.${story.id};
      `
    )

    return storyId
  }
)
