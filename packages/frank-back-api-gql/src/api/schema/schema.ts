import { Schema } from 'gql'
import MutationType from './MutationType'
import QueryType from './QueryType'

const schema = Schema({
  mutation: MutationType,
  query: QueryType,
}).build()

export default schema
