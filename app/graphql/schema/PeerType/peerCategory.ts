import createCategoryResolver from '../../resolvers/createCategoryResolver'

export default createCategoryResolver('Peer:category', ({ parent, args }) => ({
  peers_some: {
    id: parent.id,
  },
  id: args.id,
}))
