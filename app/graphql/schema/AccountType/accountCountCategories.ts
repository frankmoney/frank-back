import createCountCategoriesResolver from '../../resolvers/createCountCategoriesResolver'

export default createCountCategoriesResolver(
  'Account:countCategories',
  ({ parent }) => ({
    account: {
      id: parent.id,
    },
  })
)
