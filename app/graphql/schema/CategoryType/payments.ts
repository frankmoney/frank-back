import createPaymentsResolver from '../../resolvers/createPaymentsResolver'

export default createPaymentsResolver(
  'AccountCategory:payments',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
