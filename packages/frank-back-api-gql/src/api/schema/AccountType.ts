import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Account from 'store/types/Account'
import countCategoriesByAccountId from 'api/dal/Category/countCategoriesByAccountId'
import getCategoryByPidAndAccountId from 'api/dal/Category/getCategoryByPidAndAccountId'
import listCategoriesByAccountId from 'api/dal/Category/listCategoriesByAccountId'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import countPayments from 'api/dal/Payment/countPayments'
import countPaymentsRevenue from 'api/dal/Payment/countPaymentsRevenue'
import countPaymentsSpending from 'api/dal/Payment/countPaymentsSpending'
import countPaymentsTotal from 'api/dal/Payment/countPaymentsTotal'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import getPaymentsLedgerPieChart from 'api/dal/Payment/getPaymentsLedgerPieChart'
import listPayments from 'api/dal/Payment/listPayments'
import countPeers from 'api/dal/Peer/countPeers'
import getPeer from 'api/dal/Peer/getPeer'
import listPeers from 'api/dal/Peer/listPeers'
import getStoryByPidAndAccountId from 'api/dal/Story/getStoryByPidAndAccountId'
import listStoriesByAccountId from 'api/dal/Story/listStoriesByAccountId'
import { throwNotFound } from 'api/errors/NotFoundError'
import ledgerBarChart from 'api/resolvers/ledgerBarChart'
import mapCategory from 'api/mappers/mapCategory'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import mapStory from 'api/mappers/mapStory'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AggregatedPayments from 'api/types/AggregatedPayments'
import AggregatedPaymentsType from './AggregatedPaymentsType'
import CategoryType from './CategoryType'
import CategoryTypeType from './CategoryTypeType'
import CurrencyType from './CurrencyType'
import LedgerBarChartType from './LedgerBarChartType'
import LedgerPieChartType from './LedgerPieChartType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'
import StoriesOrderType from './StoriesOrderType'
import StoryType from './StoryType'
import createPaymentWhere from './helpers/createPaymentWhere'
import createPeerWhere from './helpers/createPeerWhere'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'
import peersDefaultFilters from './helpers/peersDefaultFilters'

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
        type: arg.ofType(CategoryTypeType).nullable(),
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
                type: args.type,
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
        type: arg.ofType(CategoryTypeType).nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:countCategories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countCategoriesByAccountId(
              {
                accountId: account.id,
                search: args.search,
                type: args.type,
              },
              scope
            )

            return count
          }
        )
      ),
    currency: field.ofType(CurrencyType).resolve(
      createPrivateResolver('Account:currency', async ({ parent }) => {
        const account: Account = parent.$source

        return {
          code: account.currencyCode,
        }
      })
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

            const peer = await getPeer(
              {
                where: {
                  account: { id: { eq: account.id } },
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
          'Account:peers',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const peers = await listPeers(
              {
                where: createPeerWhere(args, {
                  account: { id: { eq: account.id } },
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
          'Account:countPeers',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countPeers(
              {
                where: createPeerWhere(args, {
                  account: { id: { eq: account.id } },
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
        ...paymentsDefaultFilters(arg),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PaymentsOrderType),
      }))
      .resolve(
        createPrivateResolver(
          'Account:payments',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const payments = await listPayments(
              {
                where: createPaymentWhere(args, {
                  accountId: { eq: account.id },
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
          'Account:aggregatePayments',
          async ({ parent, args, info, scope }) => {
            const account: Account = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  accountId: {
                    eq: account.id,
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
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Account:countPayments',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countPayments(
              {
                where: createPaymentWhere(args, {
                  accountId: { eq: account.id },
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
        'Account:countTotal',
        async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const count = await countPaymentsTotal(
            {
              where: createPaymentWhere(args, {
                accountId: { eq: account.id },
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
        'Account:countRevenue',
        async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const count = await countPaymentsRevenue(
            {
              where: createPaymentWhere(args, {
                accountId: { eq: account.id },
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
        'Account:countSpending',
        async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const count = await countPaymentsSpending(
            {
              where: createPaymentWhere(args, {
                accountId: { eq: account.id },
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
          'Account:ledgerBarChart',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const result = await ledgerBarChart(
              {
                ...args,
                accountId: account.id,
              },
              scope
            )

            return result
          }
        )
      ),
    ledgerPieChart: field
      .ofType(LedgerPieChartType)
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createPrivateResolver(
          'Account:ledgerPieChart',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const result = await getPaymentsLedgerPieChart(
              {
                wherePayment: createPaymentWhere(args, {
                  accountId: { eq: account.id },
                }),
              },
              scope
            )

            return result
          }
        )
      ),
    story: field
      .ofType(StoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createPrivateResolver(
          'Account:story',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const story = await getStoryByPidAndAccountId(
              { accountId: account.id, pid: args.pid },
              scope
            )

            if (story == null) {
              return throwNotFound()
            }

            return mapStory(story)
          }
        )
      ),
    stories: field
      .listOf(StoryType)
      .args(arg => ({
        published: arg.ofBool().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(StoriesOrderType),
      }))
      .resolve(
        createPrivateResolver(
          'Account:stories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const stories = await listStoriesByAccountId(
              {
                accountId: account.id,
                published: args.published,
                take: args.take,
                skip: args.skip,
                orderBy: args.sortBy,
              },
              scope
            )

            return mapStory(stories)
          }
        )
      ),
  }))
)

export default AccountType
