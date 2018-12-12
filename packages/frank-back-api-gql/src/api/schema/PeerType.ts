import { Type } from 'gql'
import { extractFieldNames } from 'gql/parse'
import Peer from 'store/types/Peer'
import getAccountByPeerId from 'api/dal/Account/getAccountByPeerId'
import countCategoriesByPeerId from 'api/dal/Category/countCategoriesByPeerId'
import getCategoryByPidAndPeerId from 'api/dal/Category/getCategoryByPidAndPeerId'
import listCategoriesByPeerId from 'api/dal/Category/listCategoriesByPeerId'
import aggregatePayments from 'api/dal/Payment/aggregatePayments'
import countPayments from 'api/dal/Payment/countPayments'
import countPaymentsRevenue from 'api/dal/Payment/countPaymentsRevenue'
import countPaymentsSpending from 'api/dal/Payment/countPaymentsSpending'
import countPaymentsTotal from 'api/dal/Payment/countPaymentsTotal'
import getPaymentByPidAndPeerId from 'api/dal/Payment/getPaymentByPidAndPeerId'
import getPaymentLastPostedOnByPeerId from 'api/dal/Payment/getPaymentLastPostedOnByPeerId'
import listPayments from 'api/dal/Payment/listPayments'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPayment from 'api/mappers/mapPayment'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AggregatedPayments from 'api/types/AggregatedPayments'
import AccountType from './AccountType'
import AggregatedPaymentsType from './AggregatedPaymentsType'
import CategoryType from './CategoryType'
import CategoryTypeType from './CategoryTypeType'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentType from './PaymentType'
import createPaymentWhere from './helpers/createPaymentWhere'

const PeerType = Type('Peer', type =>
  type.fields(field => ({
    pid: field.ofId().nullable(),
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
        type: arg.ofType(CategoryTypeType).nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Peer:categories',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const categories = await listCategoriesByPeerId(
              {
                peerId: peer.id,
                search: args.search,
                take: args.take,
                skip: args.skip,
                type: args.type,
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
        search: arg.ofString().nullable(),
        type: arg.ofType(CategoryTypeType).nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Peer:countCategories',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const count = await countCategoriesByPeerId(
              {
                peerId: peer.id,
                search: args.search,
                type: args.type,
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
        ...paymentsDefaultFilters(arg),
        sortBy: arg.ofType(PaymentsOrderType),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Peer:payments',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const payments = await listPayments(
              {
                where: createPaymentWhere(args, {
                  peerId: { eq: peer.id },
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
            const peer: Peer = parent.$source

            const result = await aggregatePayments(
              {
                fields: extractFieldNames<AggregatedPayments>(info),
                where: createPaymentWhere(args, {
                  peerId: {
                    eq: peer.id,
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
          'Peer:countPayments',
          async ({ parent, args, scope }) => {
            const peer: Peer = parent.$source

            const count = countPayments(
              {
                where: createPaymentWhere(args, {
                  peerId: { eq: peer.id },
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
        'Peer:countTotal',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsTotal(
            {
              where: createPaymentWhere(args, {
                peerId: { eq: peer.id },
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
        'Peer:countRevenue',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsRevenue(
            {
              where: createPaymentWhere(args, {
                peerId: { eq: peer.id },
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
        'Peer:countSpending',
        async ({ parent, args, scope }) => {
          const peer: Peer = parent.$source

          const count = await countPaymentsSpending(
            {
              where: createPaymentWhere(args, {
                peerId: { eq: peer.id },
              }),
            },
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
