import Source from 'store/types/Story'
import Target from 'api/types/Story'
import Mapper from './Mapper'
import map from './map'

const mapStory: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', 'pid')
  .for('createdAt', 'createdAt')
  .for('updatedAt', 'updatedAt')
  .for('publishedAt', 'publishedAt')
  .for('title', 'title')
  .for('cover', 'cover')
  .for('body', 'body')
  .build()

export default mapStory
