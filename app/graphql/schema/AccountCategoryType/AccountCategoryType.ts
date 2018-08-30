import { Type } from 'gql'
import FloatValue from '../FloatValue'
import IntValue from '../IntValue'
import PaymentType from '../PaymentType'
import payments from './payments'
import countPayments from './countPayments'
import countRevenue from './countRevenue'
import countSpending from './countSpending'
import countTotal from './countTotal'

const AccountCategoryType = Type('AccountCategory', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    color: field.ofString(),

    // peers,

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

    total: field.ofType(FloatValue).resolve(countTotal),

    revenue: field.ofType(FloatValue).resolve(countRevenue),

    spending: field.ofType(FloatValue).resolve(countSpending),
  }))
)

export default AccountCategoryType
