import createCountPaymentsTotalResolver from '../../resolvers/createCountPaymentsTotalResolver'

export default createCountPaymentsTotalResolver(
  'Account:countTotal',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
