import ExtendedBase from './ExtendedBase'
import Date from './Date'
import Id from './Id'
import Json from './Json'

type Payment = ExtendedBase & {
  data: Json
  postedOn: Date
  amount: number
  peerName: string
  description: string
  verified: boolean
  published: boolean
  accountId: Id
  peerId: Id
  categoryId: Id
  descriptionUpdaterId: Id
  peerUpdaterId: Id
  categoryUpdaterId: Id
}

export default Payment
