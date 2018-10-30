import ExtendedBase from './ExtendedBase'
import Id from './Id'

type StoryDraftPayment = ExtendedBase & {
  storyDraftId: Id
  paymentId: Id
}

export default StoryDraftPayment
