import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Category from 'store/types/Category'
import getAccount from 'api/dal/Account/getAccount'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import countPayments from 'api/dal/Payment/countPayments'
import countPeers from 'api/dal/Peer/countPeers'
import getPeer from 'api/dal/Peer/getPeer'
import listPeers from 'api/dal/Peer/listPeers'
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
import CategoryTypeType from './CategoryTypeType'
import LedgerBarChartType from './LedgerBarChartType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'
import createPaymentWhere from './helpers/createPaymentWhere'
import createPeerWhere from './helpers/createPeerWhere'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'
import peersDefaultFilters from './helpers/peersDefaultFilters'

const CategoryType = Type('Category', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
    color: field.ofString(),
    type: field.ofType(CategoryTypeType),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Category:account', async ({ parent, scope }) => {
        const category: Category = parent.$source

        const account = await getAccount(
          {
            userId: scope.user && scope.user.id,
            where: { id: { eq: category.accountId } },
          },
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

            const peer = await getPeer(
              {
                where: {
                  payments: {
                    any: {
                      category: {
                        id: { eq: category.id },
                      },
                    },
                  },
                  pid: { eq: args.pid },
                },
              },
              scope
            )

            return mapPeer(peer)
          }
        )
      ),
    peers: field
      .listOf(PeerType)
      .args(arg => ({
        ...peersDefaultFilters(arg),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PeersOrderType),
      }))
      .resolve(
        createPrivateResolver(
          'Category:peers',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const peers = await listPeers(
              {
                where: createPeerWhere(args, {
                  payments: {
                    any: {
                      category: {
                        id: { eq: category.id },
                      },
                    },
                  },
                }),
                take: args.take,
                skip: args.skip,
                orderBy: args.sortBy,
              },
              scope
            )

            return mapPeer(peers)
          }
        )
      ),
    countPeers: field
      .ofInt()
      .args(arg => ({
        ...peersDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Category:countPeers',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const count = await countPeers(
              {
                where: createPeerWhere(args, {
                  payments: {
                    any: {
                      category: {
                        id: { eq: category.id },
                      },
                    },
                  },
                }),
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
        ...paymentsDefaultFilters(arg),
        sortBy: arg.ofType(PaymentsOrderType),
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
                  category: { id: { eq: category.id } },
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
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Category:aggregatePayments',
          async ({ parent, args, info, scope }) => {
            const category: Category = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  category: { id: { eq: category.id } },
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
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Category:countPayments',
          async ({ parent, args, scope }) => {
            const category: Category = parent.$source

            const count = await countPayments(
              {
                where: createPaymentWhere(args, {
                  category: { id: { eq: category.id } },
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
                category: { id: { eq: category.id } },
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
                category: { id: { eq: category.id } },
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
                category: { id: { eq: category.id } },
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
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Category:ledgerBarChart',
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
