import { sql } from 'sql'
import { TeamMemberRole } from 'store/enums'
import mapStory from 'store/mappers/mapStory'
import { account, story, teamMember } from 'store/names'
import Id from 'store/types/Id'
import Story from 'store/types/Story'
import createQuery from '../createQuery'

export type Args = {
  userId: Id
  id: Id
}

export default createQuery<Args, undefined | null | Story>(
  'getStoryById',
  (args, { db }) =>
    db.first(
      sql`
        select
          ${story}.${story.id},
          ${story}.${story.pid},
          ${story}.${story.createdAt},
          ${story}.${story.creatorId},
          ${story}.${story.updatedAt},
          ${story}.${story.updaterId},
          ${story}.${story.publishedAt},
          ${story}.${story.title},
          ${story}.${story.cover},
          ${story}.${story.body},
          ${story}.${story.accountId}
        from ${story}
        join ${account}
        on ${story}.${story.accountId} = ${account}.${account.id}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.teamId}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.roleId} in (
          ${TeamMemberRole.administrator}, ${TeamMemberRole.manager}
        )
        and ${story}.${story.pid} = ${args.id}
        limit 1;
      `,
      mapStory
    )
)
