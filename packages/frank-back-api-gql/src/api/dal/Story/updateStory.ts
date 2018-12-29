import { Sql, sql, where } from 'sql'
import { story } from 'store/names'
import DateTime from 'store/types/DateTime'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import StoryWhere from './helpers/StoryWhere'
import storyPredicateSql from './helpers/storyPredicateSql'

export type Args = {
  userId: Id
  update: {
    title?: null | string
    cover?: null | Json
    body?: null | Json
    publishedAt?: null | DateTime | Sql
  }
  where?: StoryWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateStory',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        updatedAt: story.updatedAt,
        updaterId: story.updaterId,
        title: story.title,
        cover: story.cover,
        body: story.body,
        publishedAt: story.publishedAt,
      },
    })

    const storyId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${story}"
            set ${setSql}
            where "${story.id}" = (
              select s."${story.id}"
              from "${story}" s
              ${where(storyPredicateSql('s', args.where))}
              limit 1
            )
            returning "${story.id}"
          `
        )
      : undefined

    return storyId
  }
)
