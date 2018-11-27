import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Category from 'store/types/Category'
import getAccountByCategoryId from 'api/dal/Account/getAccountByCategoryId'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import countPayments from 'api/dal/Payment/countPayments'
import getPeerByPidAndCategoryId from 'api/dal/Peer/getPeerByPidAndCategoryId'
import listPeersByCategoryId from 'api/dal/Peer/listPeersByCategoryId'
import countPaymentsRevenue from 'api/dal/Payment/countPaymentsRevenue'
import countPaymentsSpending from 'api/dal/Payment/countPaymentsSpending'
import countPaymentsTotal from 'api/dal/Payment/countPaymentsTotal'
import getPaymentByPidAndCategoryId from 'api/dal/Payment/getPaymentByPidAndCategoryId'
import listPayments from 'api/dal/Payment/listPayments'
import mapAccount from 'api/mappers/mapAccount'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AggregatedPayments from 'api/types/AggregatedPayments'
import ledgerBarChart from '../resolvers/ledgerBarChart'
import AccountType from './AccountType'
import AggregatedPaymentsType from './AggregatedPaymentsType'
import LedgerBarChartType from './LedgerBarChartType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'
import createPaymentWhere from './helpers/createPaymentWhere'

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
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Category:payments',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const payments = await listPayments(
              {
                where: createPaymentWhere(args, {
                  categoryId: { eq: category.id },
                }),
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
    aggregatePayments: field
      .ofType(AggregatedPaymentsType)
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
          'Account:aggregatePayments',
          async ({ parent, args, info, scope }) => {
            const category: Category = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  categoryId: {
                    eq: category.id,
                  },
                }),
              },
              scope
            )

            return result
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
          'Category:countPayments',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const count = await countPayments(
              {
                where: createPaymentWhere(args, {
                  categoryId: { eq: category.id },
                }),
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

          const count = await countPaymentsTotal(
            {
              where: createPaymentWhere(args, {
                categoryId: { eq: category.id },
              }),
            },
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

          const count = await countPaymentsRevenue(
            {
              where: createPaymentWhere(args, {
                categoryId: { eq: category.id },
              }),
            },
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

          const count = await countPaymentsSpending(
            {
              where: createPaymentWhere(args, {
                categoryId: { eq: category.id },
              }),
            },
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
        verified: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:ledgerBarChart',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const result = await ledgerBarChart(
              {
                ...args,
                categoryId: category.id,
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
