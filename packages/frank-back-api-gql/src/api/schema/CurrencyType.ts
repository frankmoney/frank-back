import { Type } from 'gql'

const CurrencyType = Type('CurrencyType', type =>
  type.fields(field => ({
    code: field.ofString(),
  }))
)

export default CurrencyType
