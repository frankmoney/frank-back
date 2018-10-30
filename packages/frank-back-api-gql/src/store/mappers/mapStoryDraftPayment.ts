import { storyDraftPayment } from '../names'
import StoryDraftPayment from '../types/StoryDraftPayment'
import Mapper from './Mapper'
import map from './map'

const mapStoryDraftPayment: Mapper<StoryDraftPayment> = map<StoryDraftPayment>()
  .from(storyDraftPayment)
  .extend()
  .for('storyDraftId', x => x.storyDraftId)
  .for('paymentId', x => x.paymentId)
  .build()

export default mapStoryDraftPayment
