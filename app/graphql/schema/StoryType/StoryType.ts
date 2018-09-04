import { ID, Type } from 'gql'
import AccountType from '../AccountType'

const StoryType = Type('Story', type =>
  type.fields(field => ({
    id: field.ofType(ID),

    title: field.ofString(),

    body: field.ofJson().nullable(),

    coverImage: field.ofJson().nullable(),
  })),
)

export default StoryType
