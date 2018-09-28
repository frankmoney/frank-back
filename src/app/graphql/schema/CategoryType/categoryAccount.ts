import createAccountResolver from '../../resolvers/createAccountResolver'

export default createAccountResolver('Category:account', ({ parent }) => ({
  categories_some: {
    id: parent.id,
  },
}))
