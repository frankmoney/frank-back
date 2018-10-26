import { sql } from 'sql'
import mapStory from 'store/mappers/mapStory'
import { story, storyDraft } from 'store/names'
import Id from 'store/types/Id'
import Story from 'store/types/Story'
import createQuery from '../createQuery'

export type Args = {
  draftId: Id
}

export default createQuery<Args, Story>(
  'getStoryByStoryDraftId',
  (args, { db }) => db.first(
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
      join ${storyDraft}
      on ${story}.${story.id} = ${storyDraft}.${storyDraft.storyId}
      where ${storyDraft}.${storyDraft.id} = ${args.draftId}
      limit 1;
    `,
    mapStory
  )
)
