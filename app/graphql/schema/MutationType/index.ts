import { ID, String, Type, Json } from 'gql'
import StoryType from '../StoryType'
import storyCreate from './story/create'
import storyUpdate from './story/update'
import storyDelete from './story/delete'

const MutationType = Type('Mutation', type =>
  type.fields(field => ({
    storyCreate: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        title: arg.ofType(String),
        body: arg.ofType(Json),
        coverImage: arg.ofType(Json).nullable(),
        paymentsIds: arg.listOf(ID).nullable(),
      }))
      .resolve(storyCreate),
    storyUpdate: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        storyId: arg.ofType(ID),
        title: arg.ofType(String).nullable(),
        body: arg.ofType(Json).nullable(),
        coverImage: arg.ofType(Json).nullable(),
        paymentsIds: arg.listOf(ID).nullable(),
      }))
      .resolve(storyUpdate),
    storyDelete: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        storyId: arg.ofType(ID),
      }))
      .resolve(storyDelete),
  })),
)

export default MutationType
