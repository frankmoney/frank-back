import createAccountResolver from '../../resolvers/createAccountResolver'

export default createAccountResolver('Peer:account', ({ parent }) => ({
  peers_some: {
    id: parent.id,
  },
}))
