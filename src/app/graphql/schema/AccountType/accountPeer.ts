import createPeerResolver from '../../resolvers/createPeerResolver'

export default createPeerResolver('Account:peer', ({ parent, args }) => ({
  account: {
    id: parent.id,
  },
  id: args.id,
}))
