import { Date, Type } from 'gql'

const DateValue = Type('DateValue', type =>
  type.fields(field => ({
    value: field.ofType(Date),
  }))
)

export default DateValue
