import createPeerResolver from '../../resolvers/createPeerResolver'

export default createPeerResolver('Category:peer', ({ parent, args }) => ({
  categories_some: {
    id: parent.id,
  },
  id: args.id,
}))
