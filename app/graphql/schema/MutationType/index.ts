import { ID, String, Type, Json } from 'gql'
import StoryType from '../StoryType'
import storiesCreate from './stories/create'
import storiesUpdate from './stories/update'
import storiesDelete from './stories/delete'

const QueryType = Type('Mutation', type =>
  type.fields(field => ({
    storiesCreate: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        title: arg.ofType(String),
        body: arg.ofType(Json),
        coverImage: arg.ofType(Json).nullable(),
        paymentsIds: arg.listOf(ID).nullable(),
      }))
      .resolve(storiesCreate),
    storiesUpdate: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        storyId: arg.ofType(ID),
        title: arg.ofType(String).nullable(),
        body: arg.ofType(Json).nullable(),
        coverImage: arg.ofType(Json).nullable(),
        paymentsIds: arg.listOf(ID).nullable(),
      }))
      .resolve(storiesUpdate),
    storiesDelete: field
      .ofType(StoryType)
      .args(arg => ({
        accountId: arg.ofType(ID),
        storyId: arg.ofType(ID),
      }))
      .resolve(storiesDelete),
  })),
)

export default QueryType
