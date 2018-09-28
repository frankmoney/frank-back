import createPaymentResolver from '../../resolvers/createPaymentResolver'

export default createPaymentResolver('Account:payment', ({ parent, args }) => ({
  account: {
    id: parent.id,
  },
  id: args.id,
}))
