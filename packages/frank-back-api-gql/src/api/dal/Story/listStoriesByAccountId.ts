import { sql, limit } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story } from 'store/names'
import Id from 'store/types/Id'
import Story from 'store/types/Story'
import createQuery from '../createQuery'

export type Args = {
  accountId: Id
  take?: number
  skip?: number
}

export default createQuery<Args, Story[]>(
  'listStoriesByAccountId',
  (args, { db }) => db.query(
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
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapStory
    )
)
