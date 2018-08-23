import directoryPeer from './directoryPeer'
import directoryPeers from './directoryPeers'
import updatePayments from './updatePayments'
import updatePeer from './updatePeer'

export default {
  Query: {
    directoryPeer,
    directoryPeers,
  },
  Mutation: {
    updatePayments,
    updatePeer,
  },
}
