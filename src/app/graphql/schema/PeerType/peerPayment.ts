import createPaymentResolver from '../../resolvers/createPaymentResolver'

export default createPaymentResolver('Peer:payment', ({ parent, args }) => ({
  peer: {
    id: parent.id,
  },
  id: args.id,
}))
