import ExtendedBase from './ExtendedBase'
import Date from './Date'
import Id from './Id'
import Json from './Json'

type Payment = ExtendedBase & {
  data: Json
  postedOn: Date
  amount: number
  rawPeerName: string
  description: string
  published: boolean
  accountId: Id
  peerId: Id
  categoryId: Id
}

export default Payment
