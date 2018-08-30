import createCountPaymentsRevenueResolver from '../../resolvers/createCountPaymentsRevenueResolver'

export default createCountPaymentsRevenueResolver(
  'Account:countRevenue',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
