import { sql } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  id: Id
}

export default createQuery<Args>('getStoryById', (args, { db }) =>
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
      where ${story}.${story.id} = ${args.id}
      limit 1;
    `,
    mapStory
  )
)
