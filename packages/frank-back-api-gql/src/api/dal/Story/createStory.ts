import { Sql, sql } from 'sql'
import { story } from 'store/names'
import DateTime from 'store/types/DateTime'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  accountId: Id
  title: null | string
  cover: null | Json
  body: null | Json
  publishedAt: null | DateTime | Sql
}

export default createMutation<Args, Id>('createStory', (args, { db }) =>
  db.scalar<Id>(
    sql`
      insert into
        "${story}" (
          "${story.creatorId}",
          "${story.accountId}",
          "${story.title}",
          "${story.cover}",
          "${story.body}",
          "${story.publishedAt}"
        )
      values
        (
          ${args.userId},
          ${args.accountId},
          ${args.title},
          ${args.cover},
          ${args.body},
          ${args.publishedAt}
        )
      returning
        "${story.id}"
    `
  )
)
