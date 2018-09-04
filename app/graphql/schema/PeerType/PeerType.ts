import { Type } from 'gql'
import AccountType from '../AccountType'
import CategoryType from '../CategoryType'
import DateValue from '../DateValue'
import FloatValue from '../FloatValue'
import IntValue from '../IntValue'
import PaymentType from '../PaymentType'
import peerAccount from './peerAccount'
import peerCategories from './peerCategories'
import peerCategory from './peerCategory'
import peerCountCategories from './peerCountCategories'
import peerCountPayments from './peerCountPayments'
import peerCountRevenue from './peerCountRevenue'
import peerCountSpending from './peerCountSpending'
import peerCountTotal from './peerCountTotal'
import peerLastPaymentOn from './peerLastPaymentOn'
import peerPayment from './peerPayment'
import peerPayments from './peerPayments'

const PeerType = Type('Peer', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    lastPaymentOn: field
      .ofType(DateValue)
      .nullable()
      .args(arg => ({
        incomes: arg.ofBool().nullable(),
        expenses: arg.ofBool().nullable(),
      }))
      .resolve(peerLastPaymentOn),

    account: field.ofType(AccountType).resolve(peerAccount),

    category: field
      .ofType(CategoryType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(peerCategory),

    categories: field
      .listOf(CategoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(peerCategories),

    countCategories: field
      .listOf(CategoryType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(peerCountCategories),

    payment: field
      .ofType(PaymentType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(peerPayment),

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
      .resolve(peerPayments),

    countPayments: field
      .ofType(IntValue)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(peerCountPayments),

    total: field.ofType(FloatValue).resolve(peerCountTotal),

    revenue: field.ofType(FloatValue).resolve(peerCountRevenue),

    spending: field.ofType(FloatValue).resolve(peerCountSpending),
  }))
)

export default PeerType