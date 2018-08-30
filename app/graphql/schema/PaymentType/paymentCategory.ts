import createCategoryResolver from '../../resolvers/createCategoryResolver'

export default createCategoryResolver('Payment:category', ({ parent }) => ({
  peers_some: {
    peer: {
      payments_some: {
        id: parent.id,
      },
    },
  },
}))
