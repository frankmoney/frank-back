import { Schema } from 'gql'
import QueryType from './QueryType'

const schema = Schema({
  query: QueryType,
}).build()

export default schema
