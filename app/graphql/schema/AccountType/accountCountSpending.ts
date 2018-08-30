import createCountPaymentsSpendingResolver from '../../resolvers/createCountPaymentsSpendingResolver'

export default createCountPaymentsSpendingResolver(
  'Account:countSpending',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
