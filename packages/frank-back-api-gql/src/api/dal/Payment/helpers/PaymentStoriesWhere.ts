import StoryWhere from '../../Story/helpers/StoryWhere'

export default interface PaymentStoriesWhere {
  empty?: boolean
  any?: StoryWhere
  none?: StoryWhere
  or?: PaymentStoriesWhere | PaymentStoriesWhere[]
  and?: PaymentStoriesWhere | PaymentStoriesWhere[]
}
