import createCategoryResolver from '../../resolvers/createCategoryResolver'

export default createCategoryResolver(
  'Account:category',
  ({ parent, args }) => ({
    account: {
      id: parent.id,
    },
    id: args.id,
  })
)
