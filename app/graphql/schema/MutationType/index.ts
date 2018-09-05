import { ID, String, Type, Json } from 'gql'
import StoryType from '../StoryType'
import storiesCreate from './stories/create'

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
  })),
)

export default QueryType
