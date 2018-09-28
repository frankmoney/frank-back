import createPeersResolver from '../../resolvers/createPeersResolver'

export default createPeersResolver('Account:peers', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
