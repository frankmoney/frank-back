import createCountPeersResolver from '../../resolvers/createCountPeersResolver'

export default createCountPeersResolver(
  'Category:countPeers',
  ({ parent }) => ({
    categories_some: {
      id: parent.id,
    },
  })
)
