import { sql } from 'sql'
import mapStoryDraft from 'store/mappers/mapStoryDraft'
import { storyDraft } from 'store/names'
import Id from 'store/types/Id'
import StoryDraft from 'store/types/StoryDraft'
import createQuery from '../createQuery'

export type Args = {
  storyId: Id
}

export default createQuery<Args, StoryDraft>(
  'getStoryDraftByStoryId',
  (args, { db }) => db.first(
      sql`
        select
          ${storyDraft}.${storyDraft.id},
          ${storyDraft}.${storyDraft.pid},
          ${storyDraft}.${storyDraft.createdAt},
          ${storyDraft}.${storyDraft.creatorId},
          ${storyDraft}.${storyDraft.updatedAt},
          ${storyDraft}.${storyDraft.updaterId},
          ${storyDraft}.${storyDraft.publishedAt},
          ${storyDraft}.${storyDraft.title},
          ${storyDraft}.${storyDraft.cover},
          ${storyDraft}.${storyDraft.body},
          case
            when ${storyDraft}.${storyDraft.updatedAt} > ${storyDraft}.${storyDraft.publishedAt}
            then false
            else true
          end ${storyDraft}.${storyDraft.published},
          ${storyDraft}.${storyDraft.storyId}
        from ${storyDraft}
        where ${storyDraft}.${storyDraft.storyId} = ${args.storyId}
        limit 1;
      `,
      mapStoryDraft
    )
)
