import createPaymentsResolver from '../../resolvers/createPaymentsResolver'

export default createPaymentsResolver('Story:payments', ({ parent }) => ({
  story: {
    id: parent.id,
  },
}))
