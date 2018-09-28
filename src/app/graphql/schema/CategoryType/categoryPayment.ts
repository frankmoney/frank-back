import createPaymentResolver from '../../resolvers/createPaymentResolver'

export default createPaymentResolver(
  'Category:payment',
  ({ parent, args }) => ({
    category: {
      id: parent.id,
    },
    id: args.id,
  })
)
