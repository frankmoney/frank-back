import createMutations from 'utils/createMutations'
import storyCreate from './storyCreate'
import storyDelete from './storyDelete'
import storyUpdate from './storyUpdate'

export default createMutations(field => ({
  ...storyCreate(field),
  ...storyDelete(field),
  ...storyUpdate(field),
}))
