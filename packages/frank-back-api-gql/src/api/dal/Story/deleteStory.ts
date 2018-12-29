import { sql, where } from 'sql'
import { story } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import storyPredicateSql from './helpers/storyPredicateSql'
import StoryWhere from './helpers/StoryWhere'

type Args = {
  userId: Id
  where: StoryWhere
}

export default createMutation<Args, number>('deleteStory', (args, { db }) =>
  db.command(
    sql`
      delete from "${story}"
      where "${story.id}" = (
        select s."${story.id}"
        from "${story}" s
        ${where(storyPredicateSql('s', args.where))}
        limit 1
      )
    `
  )
)
