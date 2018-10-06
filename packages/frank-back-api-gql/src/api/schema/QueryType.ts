import { Type } from 'gql'
import meResolver from 'api/resolvers/meResolver'
import UserType from './UserType'

const QueryType = Type('Query', type =>
  type.fields(field => ({
    me: field
      .ofType(UserType)
      .nullable()
      .resolve(meResolver),
  }))
)

export default QueryType
