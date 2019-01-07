import { Type } from 'gql'
import PaymentType from './PaymentType'

const PaymentUpdateResultType = Type('PaymentUpdateResult', type =>
  type.fields(field => ({
    payments: field.listOf(PaymentType),
    suggestedPayments: field.listOf(PaymentType),
  }))
)

export default PaymentUpdateResultType
