import { Int, Type } from 'gql'

const IntValue = Type('IntValue', type =>
  type.fields(field => ({
    value: field.ofType(Int),
  }))
)

export default IntValue
