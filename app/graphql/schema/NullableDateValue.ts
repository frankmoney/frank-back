import { Date, Type } from 'gql'

const NullableDateValue = Type('NullableDateValue', type =>
  type.fields(field => ({
    value: field.ofType(Date).nullable(),
  }))
)

export default NullableDateValue
