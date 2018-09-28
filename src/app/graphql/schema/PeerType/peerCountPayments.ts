import createCountPaymentsResolver from '../../resolvers/createCountPaymentsResolver'

export default createCountPaymentsResolver(
  'Peer:countPayments',
  ({ parent }) => ({
    peer: {
      id: parent.id,
    },
  })
)
