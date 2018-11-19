import { Type } from 'gql'
import Category from 'store/types/Category'
import undefinedIfNull from 'utils/undefinedIfNull'
import getAccountByCategoryId from 'api/dal/Account/getAccountByCategoryId'
import getPeerByPidAndCategoryId from 'api/dal/Peer/getPeerByPidAndCategoryId'
import listPeersByCategoryId from 'api/dal/Peer/listPeersByCategoryId'
import countPaymentsByCategoryId from 'api/dal/Payment/countPaymentsByCategoryId'
import countPaymentsRevenueByCategoryId from 'api/dal/Payment/countPaymentsRevenueByCategoryId'
import countPaymentsSpendingByCategoryId from 'api/dal/Payment/countPaymentsSpendingByCategoryId'
import countPaymentsTotalByCategoryId from 'api/dal/Payment/countPaymentsTotalByCategoryId'
import getPaymentByPidAndCategoryId from 'api/dal/Payment/getPaymentByPidAndCategoryId'
import getPaymentsLedgerBarChartByCategoryId from 'api/dal/Payment/getPaymentsLedgerBarChartByCategoryId'
import listPaymentsByCategoryId from 'api/dal/Payment/listPaymentsByCategoryId'
import mapAccount from 'api/mappers/mapAccount'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import LedgerBarChartPeriodType from './LedgerBarChartPeriodType'
import LedgerBarChartType from './LedgerBarChartType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'

const CategoryType = Type('Category', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    color: field.ofString(),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Category:account', async ({ parent, scope }) => {
        const category: Category = parent.$source

        const account = await getAccountByCategoryId(
          { categoryId: category.id },
          scope
        )

        return mapAccount(account)
      })
    ),
    peer: field
      .ofType(PeerType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:peer',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const peer = await getPeerByPidAndCategoryId(
              { categoryId: category.id, pid: args.pid },
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
          'Category:peers',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const peer = await listPeersByCategoryId(
              {
                categoryId: category.id,
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
    payment: field
      .ofType(PaymentType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:payment',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const payment = await getPaymentByPidAndCategoryId(
              { categoryId: category.id, pid: args.pid },
              scope
            )

            return mapPayment(payment)
          }
        )
      ),
    payments: field
      .listOf(PaymentType)
      .args(arg => ({
        sortBy: arg.ofType(PaymentsOrderType),
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        verified: arg.ofBool().nullable(),
        published: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:payments',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const payments = await listPaymentsByCategoryId(
              {
                categoryId: category.id,
                postedOnMin: args.postedOnMin,
                postedOnMax: args.postedOnMax,
                amountMin: args.amountMin,
                amountMax: args.amountMax,
                verified: undefinedIfNull(args.verified),
                published: undefinedIfNull(args.published),
                search: args.search,
                take: args.take,
                skip: args.skip,
                orderBy: args.sortBy,
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
        published: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:countPayments',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const count = await countPaymentsByCategoryId(
              {
                categoryId: category.id,
                postedOnMin: args.postedOnMin,
                postedOnMax: args.postedOnMax,
                amountMin: args.amountMin,
                amountMax: args.amountMax,
                verified: undefinedIfNull(args.verified),
                published: undefinedIfNull(args.published),
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
        'Category:countTotal',
        async ({ parent, args, scope }) => {
          const category: Category = parent.$source

          const count = await countPaymentsTotalByCategoryId(
            { categoryId: category.id },
            scope
          )

          return count
        }
      )
    ),
    countRevenue: field.ofFloat().resolve(
      createPrivateResolver(
        'Category:countRevenue',
        async ({ parent, args, scope }) => {
          const category: Category = parent.$source

          const count = await countPaymentsRevenueByCategoryId(
            { categoryId: category.id },
            scope
          )

          return count
        }
      )
    ),
    countSpending: field.ofFloat().resolve(
      createPrivateResolver(
        'Category:countSpending',
        async ({ parent, args, scope }) => {
          const category: Category = parent.$source

          const count = await countPaymentsSpendingByCategoryId(
            { categoryId: category.id },
            scope
          )

          return count
        }
      )
    ),
    ledgerBarChart: field
      .ofType(LedgerBarChartType)
      .args(arg => ({
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        period: arg.ofType(LedgerBarChartPeriodType).nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:ledgerBarChart',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const result = await getPaymentsLedgerBarChartByCategoryId(
              {
                categoryId: category.id,
                postedOnMin: args.postedOnMin,
                postedOnMax: args.postedOnMax,
                amountMin: args.amountMin,
                amountMax: args.amountMax,
                period: args.period || 'day',
              },
              scope
            )

            return result
          }
        )
      ),
  }))
)

export default CategoryType
