import { Type } from 'gql'
import FloatValue from '../FloatValue'
import CategoryType from '../CategoryType'
import IntValue from '../IntValue'
import PaymentType from '../PaymentType'
import StoryType from '../StoryType'
import PeerType from '../PeerType'
import PeersOrder from '../PeersOrder'
import accountCategories from './accountCategories'
import accountCategory from './accountCategory'
import accountCountCategories from './accountCountCategories'
import accountCountPayments from './accountCountPayments'
import accountCountPeers from './accountCountPeers'
import accountCountRevenue from './accountCountRevenue'
import accountCountSpending from './accountCountSpending'
import accountCountTotal from './accountCountTotal'
import accountPayment from './accountPayment'
import accountPayments from './accountPayments'
import accountStories from './accountStories'
import accountPeer from './accountPeer'
import accountPeers from './accountPeers'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    category: field
      .ofType(CategoryType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(accountCategory),

    categories: field
      .listOf(CategoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(accountCategories),

    countCategories: field
      .listOf(CategoryType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(accountCountCategories),

    peer: field
      .ofType(PeerType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(accountPeer),

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
      .resolve(accountPeers),

    countPeers: field
      .ofType(IntValue)
      .args(arg => ({
        sortBy: arg.ofType(PeersOrder),
        donors: arg.ofBool().nullable(),
        recipients: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(accountCountPeers),

    payment: field
      .ofType(PaymentType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(accountPayment),

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
      .resolve(accountPayments),

    countPayments: field
      .ofType(IntValue)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(accountCountPayments),

    countTotal: field.ofType(FloatValue).resolve(accountCountTotal),

    countRevenue: field.ofType(FloatValue).resolve(accountCountRevenue),

    countSpending: field.ofType(FloatValue).resolve(accountCountSpending),

    stories: field
      .listOf(StoryType)
      .args(arg => ({
        first: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(accountStories),
  })),
)

export default AccountType
