import createCountPaymentsSpendingResolver from '../../resolvers/createCountPaymentsSpendingResolver'

export default createCountPaymentsSpendingResolver(
  'Peer:countSpending',
  ({ parent }) => ({
    peer: {
      id: parent.id,
    },
  })
)
