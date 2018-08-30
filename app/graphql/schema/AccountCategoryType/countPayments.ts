import createCountPaymentsResolver from '../../resolvers/createCountPaymentsResolver'

export default createCountPaymentsResolver(
  'AccountCategory:countPayments',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
