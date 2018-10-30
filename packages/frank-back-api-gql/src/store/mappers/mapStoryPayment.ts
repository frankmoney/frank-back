import { storyPayment } from '../names'
import StoryPayment from '../types/StoryPayment'
import Mapper from './Mapper'
import map from './map'

const mapStoryPayment: Mapper<StoryPayment> = map<StoryPayment>()
  .from(storyPayment)
  .extend()
  .for('storyId', x => x.storyId)
  .for('paymentId', x => x.paymentId)
  .build()

export default mapStoryPayment
