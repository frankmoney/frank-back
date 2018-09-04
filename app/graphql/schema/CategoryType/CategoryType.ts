import { Type } from 'gql'
import AccountType from '../AccountType'
import FloatValue from '../FloatValue'
import IntValue from '../IntValue'
import PaymentType from '../PaymentType'
import PeerType from '../PeerType'
import PeersOrder from '../PeersOrder'
import categoryAccount from './categoryAccount'
import categoryCountPayments from './categoryCountPayments'
import categoryCountPeers from './categoryCountPeers'
import categoryCountRevenue from './categoryCountRevenue'
import categoryCountSpending from './categoryCountSpending'
import categoryCountTotal from './categoryCountTotal'
import categoryPayment from './categoryPayment'
import categoryPayments from './categoryPayments'
import categoryPeer from './categoryPeer'
import categoryPeers from './categoryPeers'

const CategoryType = Type('Category', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    color: field.ofString(),

    account: field.ofType(AccountType).resolve(categoryAccount),

    peer: field
      .ofType(PeerType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(categoryPeer),

    peers: field
      .ofType(PeerType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PeersOrder),
        donors: arg.ofBool().nullable(),
        recipients: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(categoryPeers),

    countPeers: field
      .ofType(IntValue)
      .args(arg => ({
        sortBy: arg.ofType(PeersOrder),
        donors: arg.ofBool().nullable(),
        recipients: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(categoryCountPeers),

    payment: field
      .ofType(PaymentType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(categoryPayment),

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
      .resolve(categoryPayments),

    countPayments: field
      .ofType(IntValue)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(categoryCountPayments),

    total: field.ofType(FloatValue).resolve(categoryCountTotal),

    revenue: field.ofType(FloatValue).resolve(categoryCountRevenue),

    spending: field.ofType(FloatValue).resolve(categoryCountSpending),
  }))
)

export default CategoryType
