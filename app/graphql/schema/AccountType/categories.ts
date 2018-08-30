import createCategoriesResolver from 'app/graphql/resolvers/createCategoriesResolver'

export default createCategoriesResolver('Account:categories', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
