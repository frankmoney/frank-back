import { Type } from 'gql'

const PaymentSuggestedDescriptionType = Type(
  'PaymentSuggestedDescription',
  type =>
    type.fields(field => ({
      description: field.ofString(),
      count: field.ofInt(),
    }))
)

export default PaymentSuggestedDescriptionType
