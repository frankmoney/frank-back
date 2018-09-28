import createPaymentsResolver from '../../resolvers/createPaymentsResolver'

export default createPaymentsResolver('Account:payments', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
