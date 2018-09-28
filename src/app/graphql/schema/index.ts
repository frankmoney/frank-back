import { Schema } from 'gql'
import QueryType from './QueryType'
import MutationType from './MutationType'

const schema = Schema({
  query: QueryType,
  mutation: MutationType,
})

export default schema.build()
