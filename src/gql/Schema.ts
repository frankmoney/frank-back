import ObjectType from './nodes/ObjectType'
import SchemaClass from './nodes/Schema'

const Schema = (config: {
  query: ObjectType
  mutation?: ObjectType
}): SchemaClass => new SchemaClass(config)

export default Schema
