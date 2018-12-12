import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Account from 'store/types/Account'
import countCategories from 'api/dal/Category/countCategories'
import getCategory from 'api/dal/Category/getCategory'
import listCategories from 'api/dal/Category/listCategories'
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
import createResolver from 'api/resolvers/utils/createResolver'
import AccountAccess from 'api/types/AccountAccess'
import AggregatedPayments from 'api/types/AggregatedPayments'
import AccountAccessType from './AccountAccessType'
import AggregatedPaymentsType from './AggregatedPaymentsType'
import CategoryType from './CategoryType'
import CurrencyType from './CurrencyType'
import LedgerBarChartType from './LedgerBarChartType'
import LedgerPieChartType from './LedgerPieChartType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import PeersOrderType from './PeersOrderType'
import PeerType from './PeerType'
import StoriesOrderType from './StoriesOrderType'
import StoryType from './StoryType'
import categoriesDefaultFilters from './helpers/categoriesDefaultFilters'
import createCategoryWhere from './helpers/createCategoryWhere'
import createPaymentWhere from './helpers/createPaymentWhere'
import createPeerWhere from './helpers/createPeerWhere'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'
import peersDefaultFilters from './helpers/peersDefaultFilters'

const AccountType = Type('Account', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    name: field.ofString(),
    public: field.ofBool(),
    access: field.ofType(AccountAccessType).resolve(
      createResolver(
        'Account.access',
        ({ parent }): AccountAccess => {
          const account: Account = parent.$source
          return { role: account.accessRole }
        }
      )
    ),
    category: field
      .ofType(CategoryType)
      .args(arg => ({
        pid: arg.ofId(),
      }))
      .resolve(
        createResolver('Account:category', async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const category = await getCategory(
            {
              where: {
                account: { id: { eq: account.id } },
                pid: { eq: args.pid },
              },
            },
            scope
          )

          return mapCategory(category)
        })
      ),
    categories: field
      .listOf(CategoryType)
      .args(arg => ({
        ...categoriesDefaultFilters(arg),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createResolver(
          'Account:categories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const categories = await listCategories(
              {
                where: createCategoryWhere(args, {
                  account: { id: { eq: account.id } },
                }),
                take: args.take,
                skip: args.skip,
              },
              scope
            )

            return mapCategory(categories)
          }
        )
      ),
    countCategories: field
      .ofInt()
      .args(arg => ({
        ...categoriesDefaultFilters(arg),
      }))
      .resolve(
        createResolver(
          'Account:countCategories',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countCategories(
              {
                where: createCategoryWhere(args, {
                  account: { id: { eq: account.id } },
                }),
              },
              scope
            )

            return count
          }
        )
      ),
    currency: field.ofType(CurrencyType).resolve(
      createResolver('Account:currency', async ({ parent }) => {
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
        createResolver('Account:peer', async ({ parent, args, scope }) => {
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
        })
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
        createResolver('Account:peers', async ({ parent, args, scope }) => {
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
        })
      ),
    countPeers: field
      .ofInt()
      .args(arg => ({
        ...peersDefaultFilters(arg),
      }))
      .resolve(
        createResolver(
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
        createResolver('Account:payment', async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const payment = await getPaymentByPidAndAccountId(
            { accountId: account.id, pid: args.pid },
            scope
          )

          return mapPayment(payment)
        })
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
        createResolver('Account:payments', async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const payments = await listPayments(
            {
              where: createPaymentWhere(args, {
                account: { id: { eq: account.id } },
              }),
              take: args.take,
              skip: args.skip,
              orderBy: args.sortBy,
            },
            scope
          )

          return mapPayment(payments)
        })
      ),
    aggregatePayments: field
      .ofType(AggregatedPaymentsType)
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
      }))
      .resolve(
        createResolver(
          'Account:aggregatePayments',
          async ({ parent, args, info, scope }) => {
            const account: Account = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  account: { id: { eq: account.id } },
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
        createResolver(
          'Account:countPayments',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const count = await countPayments(
              {
                where: createPaymentWhere(args, {
                  account: { id: { eq: account.id } },
                }),
              },
              scope
            )

            return count
          }
        )
      ),
    countTotal: field.ofFloat().resolve(
      createResolver('Account:countTotal', async ({ parent, args, scope }) => {
        const account: Account = parent.$source

        const count = await countPaymentsTotal(
          {
            where: createPaymentWhere(args, {
              account: { id: { eq: account.id } },
            }),
          },
          scope
        )

        return count
      })
    ),
    countRevenue: field.ofFloat().resolve(
      createResolver(
        'Account:countRevenue',
        async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const count = await countPaymentsRevenue(
            {
              where: createPaymentWhere(args, {
                account: { id: { eq: account.id } },
              }),
            },
            scope
          )

          return count
        }
      )
    ),
    countSpending: field.ofFloat().resolve(
      createResolver(
        'Account:countSpending',
        async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const count = await countPaymentsSpending(
            {
              where: createPaymentWhere(args, {
                account: { id: { eq: account.id } },
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
        createResolver(
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
        createResolver(
          'Account:ledgerPieChart',
          async ({ parent, args, scope }) => {
            const account: Account = parent.$source

            const result = await getPaymentsLedgerPieChart(
              {
                wherePayment: createPaymentWhere(args, {
                  account: { id: { eq: account.id } },
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
        createResolver('Account:story', async ({ parent, args, scope }) => {
          const account: Account = parent.$source

          const story = await getStoryByPidAndAccountId(
            { accountId: account.id, pid: args.pid },
            scope
          )

          if (story == null) {
            return throwNotFound()
          }

          return mapStory(story)
        })
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
        createResolver('Account:stories', async ({ parent, args, scope }) => {
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
        })
      ),
  }))
)

export default AccountType
