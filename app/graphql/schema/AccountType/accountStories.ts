import createStoriesResolver from '../../resolvers/createStoriesResolver'

export default createStoriesResolver('Account:stories', ({ parent }) => ({
  account: {
    id: parent.id,
  },
}))
