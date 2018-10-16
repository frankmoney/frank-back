import ExtendedBase from './ExtendedBase'
import Id from './Id'

type Peer = ExtendedBase & {
  name: string
  accountId: Id
}

export default Peer
