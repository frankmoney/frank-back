import storyCreate from 'app/graphql/resolvers/storyCreate'
import storyDelete from 'app/graphql/resolvers/storyDelete'
import storyUpdate from 'app/graphql/resolvers/storyUpdate'
import createMutations from 'utils/createMutations'

export default createMutations(field => ({
  ...storyCreate(field),
  ...storyDelete(field),
  ...storyUpdate(field),
}))
