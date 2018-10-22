import { Type } from 'gql'
import mapPayment from 'store/mappers/mapPayment'
import Peer from 'store/types/Peer'
import getAccountByPeerId from 'api/dal/Account/getAccountByPeerId'
import countCategoriesByPeerId from 'api/dal/Category/countCategoriesByPeerId'
import getCategoryByPidAndPeerId from 'api/dal/Category/getCategoryByPidAndPeerId'
import listCategoriesByPeerId from 'api/dal/Category/listCategoriesByPeerId'
import countPaymentsByPeerId from 'api/dal/Payment/countPaymentsByPeerId'
import countPaymentsRevenueByPeerId from 'api/dal/Payment/countPaymentsRevenueByPeerId'
import countPaymentsSpendingByPeerId from 'api/dal/Payment/countPaymentsSpendingByPeerId'
import countPaymentsTotalByPeerId from 'api/dal/Payment/countPaymentsTotalByPeerId'
import getPaymentByPidAndPeerId from 'api/dal/Payment/getPaymentByPidAndPeerId'
import getPaymentLastPostedOnByPeerId from 'api/dal/Payment/getPaymentLastPostedOnByPeerId'
import listPaymentsByPeerId from 'api/dal/Payment/listPaymentsByPeerId'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import CategoryType from './CategoryType'
import PaymentType from './PaymentType'

const PeerType = Type('Peer', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Peer:account', async ({ parent, scope }) => {
        const peer: Peer = parent.$source

        const account = await getAccountByPeerId({ peerId: peer.id }, scope)

        return mapAccount(account)
      })
    ),
    category: field
      .ofType(CategoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Peer:category',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const category = await getCategoryByPidAndPeerId(
              { peerId: peer.id, pid: args.pid },
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
          'Peer:categories',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const categories = await listCategoriesByPeerId(
              { peerId: peer.id },
              scope
            )

            return mapCategory(categories)
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
          'Peer:countCategories',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const count = await countCategoriesByPeerId(
              { peerId: peer.id },
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
          'Peer:payment',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const payment = await getPaymentByPidAndPeerId(
              { peerId: peer.id, pid: args.pid },
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
          'Peer:payments',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const payments = await listPaymentsByPeerId(
              {
                peerId: peer.id,
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
          'Peer:countPayments',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const count = countPaymentsByPeerId(
              {
                peerId: peer.id,
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
    countTotal: field.ofFloat().resolve(
      createPrivateResolver(
        'Peer:countTotal',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsTotalByPeerId(
            { peerId: peer.id },
            scope
          )

          return count
        }
      )
    ),
    countRevenue: field.ofFloat().resolve(
      createPrivateResolver(
        'Peer:countRevenue',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsRevenueByPeerId(
            { peerId: peer.id },
            scope
          )

          return count
        }
      )
    ),
    countSpending: field.ofFloat().resolve(
      createPrivateResolver(
        'Peer:countSpending',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsSpendingByPeerId(
            { peerId: peer.id },
            scope
          )

          return count
        }
      )
    ),
    lastPaymentOn: field
      .ofDate()
      .nullable()
      .resolve(
        createPrivateResolver(
          'Peer:lastPaymentOn',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const lastPostedOn = await getPaymentLastPostedOnByPeerId(
              { peerId: peer.id },
              scope
            )

            return lastPostedOn
          }
        )
      ),
  }))
)

export default PeerType
