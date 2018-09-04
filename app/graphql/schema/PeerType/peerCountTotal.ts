import createCountPaymentsTotalResolver from '../../resolvers/createCountPaymentsTotalResolver'

export default createCountPaymentsTotalResolver(
  'Peer:countTotal',
  ({ parent }) => ({
    peer: {
      id: parent.id,
    },
  })
)
