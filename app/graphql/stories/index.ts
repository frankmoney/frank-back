import stories from './stories'
import createStory from './createStory'
import deleteStory from './deleteStory'
import updateStory from './updateStory'

export default {
  Query: {
    stories,
  },
  Mutation: {
    createStory,
    deleteStory,
    updateStory,
  },
}
