import Id from './Id'
import Json from './Json'

type Payment = {
  pid: Id
  data: Json
  postedOn: Date
  amount: number
  peerName: string
  description: string
  verified: boolean
  pending: boolean
}

export default Payment
