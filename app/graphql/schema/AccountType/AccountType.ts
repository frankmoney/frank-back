import { Type } from 'gql'
import FloatValue from '../FloatValue'
import IntValue from '../IntValue'
import PaymentType from '../PaymentType'
import countPayments from './countPayments'
import countRevenue from './countRevenue'
import countSpendings from './countSpendings'
import countTotal from './countTotal'
import payments from './payments'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    payments: field
      .listOf(PaymentType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(payments),

    countPayments: field
      .ofType(IntValue)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(countPayments),

    total: field
      .ofType(FloatValue)
      .args(arg => ({
        peerId: arg.ofID().nullable(),
        categoryId: arg.ofID().nullable(),
      }))
      .resolve(countTotal),

    revenue: field
      .ofType(FloatValue)
      .args(arg => ({
        peerId: arg.ofID().nullable(),
        categoryId: arg.ofID().nullable(),
      }))
      .resolve(countRevenue),

    spendings: field
      .ofType(FloatValue)
      .args(arg => ({
        peerId: arg.ofID().nullable(),
        categoryId: arg.ofID().nullable(),
      }))
      .resolve(countSpendings),
  }))
)

export default AccountType
