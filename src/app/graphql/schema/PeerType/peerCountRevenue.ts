import createCountPaymentsRevenueResolver from '../../resolvers/createCountPaymentsRevenueResolver'

export default createCountPaymentsRevenueResolver(
  'Peer:countRevenue',
  ({ parent }) => ({
    peer: {
      id: parent.id,
    },
  })
)
