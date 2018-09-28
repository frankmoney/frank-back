import createCountPaymentsTotalResolver from '../../resolvers/createCountPaymentsTotalResolver'

export default createCountPaymentsTotalResolver(
  'AccountCategory:countTotal',
  ({ parent }) => ({
    category: {
      id: parent.id,
    },
  })
)
