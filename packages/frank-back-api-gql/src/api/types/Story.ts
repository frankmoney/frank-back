import DateTime from './DateTime'
import Json from './Json'
import Pid from './Pid'

type Story = {
  pid: Pid
  createdAt: DateTime
  updatedAt: null | DateTime
  publishedAt: null | DateTime
  title: null | string
  cover: null | Json
  body: null | Json
}

export default Story
