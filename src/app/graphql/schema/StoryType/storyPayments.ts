import createPaymentsResolver from '../../resolvers/createPaymentsResolver'

export default createPaymentsResolver('Story:payments', ({ parent }) => ({
  storyData: {
    id: parent.id,
  },
}))
