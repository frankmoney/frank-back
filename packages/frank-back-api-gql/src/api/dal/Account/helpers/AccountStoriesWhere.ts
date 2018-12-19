import StoryWhere from '../../Story/helpers/StoryWhere'

export default interface AccountStoriesWhere {
  empty?: boolean
  any?: StoryWhere
  none?: StoryWhere
  or?: AccountStoriesWhere | AccountStoriesWhere[]
  and?: AccountStoriesWhere | AccountStoriesWhere[]
}
