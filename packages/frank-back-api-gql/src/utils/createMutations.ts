import ObjectTypeField from 'gql/nodes/ObjectTypeField'
import ObjectTypeFieldBuilder from 'gql/nodes/ObjectTypeFieldBuilder'

const createMutations = <T extends { [fieldName: string]: ObjectTypeField }>(
  build: (field: ObjectTypeFieldBuilder) => T
): ((field: ObjectTypeFieldBuilder) => T) => field => build(field)

export default createMutations
