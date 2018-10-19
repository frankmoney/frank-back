import { Type } from 'gql'
import Account from 'store/types/Account'
import countCategoriesByAccountId from 'api/dal/Category/countCategoriesByAccountId'
import getCategoryByPidAndAccountId from 'api/dal/Category/getCategoryByPidAndAccountId'
import listCategoriesByAccountId from 'api/dal/Category/listCategoriesByAccountId'
import countPaymentsByAccountId from 'api/dal/Payment/countPaymentsByAccountId'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import listPaymentsByAccountId from 'api/dal/Payment/listPaymentsByAccountId'
import countPeersByAccountId from 'api/dal/Peer/countPeersByAccountId'
import getPeerByPidAndAccountId from 'api/dal/Peer/getPeerByPidAndAccountId'
import listPeersByAccountId from 'api/dal/Peer/listPeersByAccountId'
import mapCategory from 'api/mappers/mapCategory'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import CategoryType from './CategoryType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    name: field.ofString(),
    category: field
      .ofType(CategoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:category',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const category = await getCategoryByPidAndAccountId(
              { accountId: account.id, pid: args.pid },
              scope
            )

            return mapCategory(category)
          }
        )
      ),
    categories: field
      .listOf(CategoryType)
      .args(arg => ({
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:categories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const category = await listCategoriesByAccountId(
              {
                accountId: account.id,
                search: args.search,
                take: args.take,
                skip: args.skip,
              },
              scope
            )

            return mapCategory(category)
          }
        )
      ),
    countCategories: field
      .ofInt()
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:countCategories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countCategoriesByAccountId(
              { accountId: account.id, search: args.search },
              scope
            )

            return count
          }
        )
      ),
    peer: field
      .ofType(PeerType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:peer',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const peer = await getPeerByPidAndAccountId(
              { accountId: account.id, pid: args.pid },
              scope
            )

            return mapPeer(peer)
          }
        )
      ),
    peers: field
      .listOf(PeerType)
      .args(arg => ({
        sortBy: arg.ofType(PeersOrderType),
        donors: arg.ofBool(),
        recipients: arg.ofBool(),
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:peers',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const peer = await listPeersByAccountId(
              {
                accountId: account.id,
                donors: args.donors,
                recipients: args.recipients,
                search: args.search,
                take: args.take,
                skip: args.skip,
                orderBy: args.sortBy,
              },
              scope
            )

            return mapPeer(peer)
          }
        )
      ),
    countPeers: field
      .ofInt()
      .args(arg => ({
        donors: arg.ofBool(),
        recipients: arg.ofBool(),
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:countPeers',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countPeersByAccountId(
              {
                accountId: account.id,
                donors: args.donors,
                recipients: args.recipients,
                search: args.search,
              },
              scope
            )

            return count
          }
        )
      ),
    payment: field
      .ofType(PaymentType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:payment',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const payment = await getPaymentByPidAndAccountId(
              { accountId: account.id, pid: args.pid },
              scope
            )

            return mapPayment(payment)
          }
        )
      ),
    payments: field
      .listOf(PaymentType)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        verified: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:payments',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const payments = await listPaymentsByAccountId(
              {
                accountId: account.id,
                postedOnMin: args.postedOnMin,
                postedOnMax: args.postedOnMax,
                amountMin: args.amountMin,
                amountMax: args.amountMax,
                verified: args.verified,
                search: args.search,
                take: args.take,
                skip: args.skip,
              },
              scope
            )

            return mapPayment(payments)
          }
        )
      ),
    countPayments: field
      .ofInt()
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        verified: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:payments',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countPaymentsByAccountId(
              {
                accountId: account.id,
                postedOnMin: args.postedOnMin,
                postedOnMax: args.postedOnMax,
                amountMin: args.amountMin,
                amountMax: args.amountMax,
                verified: args.verified,
                search: args.search,
              },
              scope
            )

            return count
          }
        )
      ),
  }))
)

export default AccountType