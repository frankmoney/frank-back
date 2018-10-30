import { sql } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story } from 'store/names'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import Story from 'store/types/Story'
import createQuery from '../createQuery'

export type Args = {
  pid: Pid
  accountId: Id
}

export default createQuery<Args, undefined | null | Story>(
  'getStoryByPidAndAccountId',
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
        where ${story}.${story.accountId} = ${args.accountId}
        and ${story}.${story.pid} = ${args.pid}
        limit 1;
      `,
      mapStory
    )
)
