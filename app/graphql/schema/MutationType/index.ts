import { Type } from 'gql'
import storyCreate from './story/create'
import storyUpdate from './story/update'
import storyDelete from './story/delete'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    storyCreate: storyCreate(field),
    storyUpdate: storyUpdate(field),
    storyDelete: storyDelete(field),
  })),
)

export default MutationType
