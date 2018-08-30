import { Type } from 'gql'
import FloatValue from '../FloatValue'
import IntValue from '../IntValue'
import AccountCategoryType from '../AccountCategoryType'
import PaymentType from '../PaymentType'
import categories from './categories'
import category from './category'
import countCategories from './countCategories'
import countPayments from './countPayments'
import countRevenue from './countRevenue'
import countSpending from './countSpending'
import countTotal from './countTotal'
import payments from './payments'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    category: field
      .ofType(AccountCategoryType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(category),

    categories: field
      .listOf(AccountCategoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(categories),

    countCategories: field
      .listOf(AccountCategoryType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(countCategories),

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

export default AccountType
