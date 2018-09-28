import { Float, Type } from 'gql'

const FloatValue = Type('FloatValue', type =>
  type.fields(field => ({
    value: field.ofType(Float),
  }))
)

export default FloatValue
