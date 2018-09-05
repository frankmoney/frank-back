import { Type } from 'gql'

const MeType = Type('Me', type =>
  type.fields(field => ({
    id: field.ofID(),
    email: field.ofString(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString().nullable(),
  }))
)

export default MeType
