import ExtendedBase from './ExtendedBase'
import Id from './Id'

type StoryPayment = ExtendedBase & {
  storyId: Id
  paymentId: Id
}

export default StoryPayment
