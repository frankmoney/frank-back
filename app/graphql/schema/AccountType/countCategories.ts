import createCountCategoriesResolver from 'app/graphql/resolvers/createCountCategoriesResolver'

export default createCountCategoriesResolver(
  'Account:countCategories',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
