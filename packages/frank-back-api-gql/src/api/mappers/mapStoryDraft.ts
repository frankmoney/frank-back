import Source from 'store/types/StoryDraft'
import Target from 'api/types/StoryDraft'
import Mapper from './Mapper'
import map from './map'

const mapStoryDraft: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('createdAt', 'createdAt')
  .for('updatedAt', 'updatedAt')
  .for('publishedAt', 'publishedAt')
  .for('title', 'title')
  .for('cover', 'cover')
  .for('body', 'body')
  .for('published', 'published')
  .build()

export default mapStoryDraft
