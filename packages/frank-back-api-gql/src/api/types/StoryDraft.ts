import DateTime from './DateTime'
import Json from './Json'
import Pid from './Pid'

type StoryDraft = {
  pid: Pid
  createdAt: DateTime
  updatedAt: null | DateTime
  publishedAt: null | DateTime
  title: null | string
  cover: null | Json
  body: null | Json
  published: boolean
}

export default StoryDraft
