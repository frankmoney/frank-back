import { storyDraft } from '../names'
import StoryDraft from '../types/StoryDraft'
import Mapper from './Mapper'
import map from './map'

const mapStoryDraft: Mapper<StoryDraft> = map<StoryDraft>()
  .from(storyDraft)
  .extend()
  .for('publishedAt', x => x.publishedAt)
  .for('title', x => x.title)
  .for('cover', x => x.cover)
  .for('body', x => x.body)
  .for('storyId', x => x.storyId)
  .for('published', x => x.published)
  .build()

export default mapStoryDraft
