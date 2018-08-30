import createCategoriesResolver from '../../resolvers/createCategoriesResolver'

export default createCategoriesResolver('Peer:categories', ({ parent }) => ({
  peers_some: {
    id: parent.id,
  },
}))
