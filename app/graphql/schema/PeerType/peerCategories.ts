import createCategoriesResolver from '../../resolvers/createCategoriesResolver'

export default createCategoriesResolver('Peer:categories', ({ parent }) => ({
  peers_some: {
    peer: { id: parent.id },
  },
}))
