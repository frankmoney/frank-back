import createCountPeersResolver from '../../resolvers/createCountPeersResolver'

export default createCountPeersResolver('Account:countPeers', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
