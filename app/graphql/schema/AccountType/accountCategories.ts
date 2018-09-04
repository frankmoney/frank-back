import createCategoriesResolver from '../../resolvers/createCategoriesResolver'

export default createCategoriesResolver('Account:categories', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
