import createPeerResolver from '../../resolvers/createPeerResolver'

export default createPeerResolver('Payment:peer', ({ parent }) => ({
  payments_some: {
    id: parent.id,
  },
}))
