import StoryType from './StoryType'

export default StoryType

export const FULL_STORY_QUERY = '{ id, ' +
  'isPublished, ' +
  'updatedAt,' +
  'draftData { id, title, body, coverImage, payments { id } }, ' +
  'publicData { id, title, body, coverImage, payments { id } }  ' +
  '}'
