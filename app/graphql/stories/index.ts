import stories from './stories'
import createStory from './createStory'
import deleteStory from './deleteStory'

export default {
  Query: {
    stories,
  },
  Mutation: {
    createStory,
    deleteStory,
  },
}
