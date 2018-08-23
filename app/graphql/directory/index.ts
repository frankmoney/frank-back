import directoryPeer from './directoryPeer'
import directoryPeers from './directoryPeers'
import directoryPeersCount from './directoryPeersCount'
import updatePayments from './updatePayments'
import updatePeer from './updatePeer'

export default {
  Query: {
    directoryPeer,
    directoryPeers,
    directoryPeersCount,
  },
  Mutation: {
    updatePayments,
    updatePeer,
  },
}
