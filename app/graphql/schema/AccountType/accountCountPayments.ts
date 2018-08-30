import createCountPaymentsResolver from '../../resolvers/createCountPaymentsResolver'

export default createCountPaymentsResolver(
  'Account:countPayments',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
