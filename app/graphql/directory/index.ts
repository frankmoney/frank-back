import directoryPeer from './directoryPeer'
import directoryPeers from './directoryPeers'
import updatePeer from './updatePeer'

export default {
  Query: {
    directoryPeer,
    directoryPeers,
  },
  Mutation: {
    updatePeer,
  },
}
