import createCountPaymentsSpendingResolver from '../../resolvers/createCountPaymentsSpendingResolver'

export default createCountPaymentsSpendingResolver(
  'AccountCategory:countSpending',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
