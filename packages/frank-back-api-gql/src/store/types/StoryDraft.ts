import DateTime from './DateTime'
import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type StoryDraft = ExtendedBase & {
  publishedAt: null | DateTime
  title: null | string
  cover: null | Json
  body: null | Json
  published: boolean
  storyId: Id
}

export default StoryDraft
