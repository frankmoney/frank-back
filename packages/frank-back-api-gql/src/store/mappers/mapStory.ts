import { story } from '../names'
import Story from '../types/Story'
import Mapper from './Mapper'
import map from './map'

const mapStory: Mapper<Story> = map<Story>()
  .from(story)
  .extend()
  .for('publishedAt', x => x.publishedAt)
  .for('title', x => x.title)
  .for('cover', x => x.cover)
  .for('body', x => x.body)
  .for('accountId', x => x.accountId)
  .build()

export default mapStory
