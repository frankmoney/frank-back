import createPeersResolver from '../../resolvers/createPeersResolver'

export default createPeersResolver('Category:peers', ({ parent, args }) => ({
  categories_some: {
    id: parent.id,
  },
}))
