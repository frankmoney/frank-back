import createCountPaymentsRevenueResolver from '../../resolvers/createCountPaymentsRevenueResolver'

export default createCountPaymentsRevenueResolver(
  'AccountCategory:countRevenue',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
