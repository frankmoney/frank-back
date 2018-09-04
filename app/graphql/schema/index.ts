import { Schema } from 'gql'
import QueryType from './QueryType'

const schema = Schema({
  query: QueryType,
})

export default schema.build()
