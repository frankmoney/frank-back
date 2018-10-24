import DateTime from './DateTime'
import ExtendedBase from './ExtendedBase'
import Id from './Id'
import Json from './Json'

type Story = ExtendedBase & {
  publishedAt: null | DateTime
  title: null | string
  cover: null | Json
  body: null | Json
  accountId: Id
}

export default Story
