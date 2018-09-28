import createCountPaymentsResolver from '../../resolvers/createCountPaymentsResolver'

export default createCountPaymentsResolver(
  'Story:countPayments',
  ({ parent }) => ({
    storyData: {
      id: parent.id,
    },
  })
)
