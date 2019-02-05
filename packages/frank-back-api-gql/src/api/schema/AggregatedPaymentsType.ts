import { Type } from 'gql'

const AggregatedPaymentsType = Type('AggregatedPayments', type =>
  type.fields(field => ({
    count: field.ofInt(),
    postedOnMin: field.ofDate().nullable(),
    postedOnMax: field.ofDate().nullable(),
    amountMin: field.ofFloat().nullable(),
    amountMax: field.ofFloat().nullable(),
    totalSum: field.ofFloat().nullable(),
  }))
)

export default AggregatedPaymentsType
