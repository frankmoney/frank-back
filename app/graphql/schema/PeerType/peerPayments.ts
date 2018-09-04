import createPaymentsResolver from '../../resolvers/createPaymentsResolver'

export default createPaymentsResolver('Peer:payments', ({ parent }) => ({
  peer: {
    id: parent.id,
  },
}))
