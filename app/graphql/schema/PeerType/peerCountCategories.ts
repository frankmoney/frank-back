import createCountCategoriesResolver from '../../resolvers/createCountCategoriesResolver'

export default createCountCategoriesResolver(
  'Peer:countCategories',
  ({ parent }) => ({
    peers_some: {
      peer: { id: parent.id },
    },
  })
)
