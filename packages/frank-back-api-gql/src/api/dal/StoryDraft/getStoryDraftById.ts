import { sql } from 'sql'
import mapStoryDraft from 'store/mappers/mapStoryDraft'
import { storyDraft } from 'store/names'
import Id from 'store/types/Id'
import StoryDraft from 'store/types/StoryDraft'
import createQuery from '../createQuery'

export type Args = {
  id: Id
}

export default createQuery<Args, undefined | null | StoryDraft>(
  'getStoryDraftById',
  (args, { db }) =>
    db.first(
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
          when ${storyDraft}.${storyDraft.updatedAt} is null
          or ${storyDraft}.${storyDraft.publishedAt} is null
          or ${storyDraft}.${storyDraft.updatedAt} > ${storyDraft}.${
        storyDraft.publishedAt
      }
          then false
          else true
        end ${storyDraft.published},
        ${storyDraft}.${storyDraft.storyId}
      from ${storyDraft}
      where ${storyDraft}.${storyDraft.id} = ${args.id}
    `,
      mapStoryDraft
    )
)
