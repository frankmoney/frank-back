import { sql, where } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story } from 'store/names'
import Story from 'store/types/Story'
import createQuery from '../createQuery'
import StoryWhere from './helpers/StoryWhere'
import storyFieldsSql from './helpers/storyFieldsSql'
import storyPredicateSql from './helpers/storyPredicateSql'

export type Args = {
  where?: StoryWhere
}

export default createQuery<Args, Story>('getStory', (args, { db }) =>
  db.first(
    sql`
      select ${storyFieldsSql('s')}
      from "${story}" s
      ${where(storyPredicateSql('s', args.where))}
      limit 1
    `,
    mapStory
  )
)
