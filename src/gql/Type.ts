import ObjectType from './nodes/ObjectType'
import ObjectTypeBuilder from './nodes/ObjectTypeBuilder'

const Type = (
  name: string,
  build: (type: ObjectTypeBuilder) => ObjectType
): ObjectType => build(new ObjectTypeBuilder(name))

export default Type
