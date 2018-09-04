import createCountPaymentsResolver from '../../resolvers/createCountPaymentsResolver'

export default createCountPaymentsResolver(
  'Story:countPayments',
  ({ parent }) => ({
    story: {
      id: parent.id,
    },
  })
)
