import createAccountResolver from '../../resolvers/createAccountResolver'

export default createAccountResolver('Payment:account', ({ parent }) => ({
  payments_some: {
    id: parent.id,
  },
}))
