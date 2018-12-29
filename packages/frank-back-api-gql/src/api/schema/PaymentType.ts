import * as R from 'ramda'
import { Type } from 'gql'
import ObjectTypeFieldBuilder from 'gql/nodes/ObjectTypeFieldBuilder'
import Payment from 'store/types/Payment'
import getAccount from 'api/dal/Account/getAccount'
import getCategory from 'api/dal/Category/getCategory'
import listSimilarPaymentsById from 'api/dal/Payment/listSimilarPaymentsById'
import getPeer from 'api/dal/Peer/getPeer'
import getUser from 'api/dal/User/getUser'
import countSimilarPaymentsByPid from 'api/dal/Payment/countSimilarPaymentsByPid'
import listPaymentDescriptionsByAccountId from 'api/dal/Payment/listPaymentDescriptionsByAccountId'
import getSource from 'api/dal/Source/getSource'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import mapSource from 'api/mappers/mapSource'
import mapUser from 'api/mappers/mapUser'
import createResolver from 'api/resolvers/utils/createResolver'
import getSimilarPaymentDateRangeById from 'api/dal/Payment/getSimilarPaymentDateRangeById'
import Date from 'api/types/Date'
import AccountType from './AccountType'
import CategoryType from './CategoryType'
import SourceType from './SourceType'
import paymentsDefaultFilters from './helpers/paymentsDefaultFilters'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentSuggestedDescriptionType from './PaymentSuggestedDescriptionType'
import UserType from './UserType'
import PeerType from './PeerType'
import createPaymentWhere from './helpers/createPaymentWhere'

const updaterConstructor = (
  field: ObjectTypeFieldBuilder,
  fieldName: string
) => {
  return field
    .ofType(UserType)
    .nullable()
    .resolve(
      createResolver(`Payment:${fieldName}`, async ({ parent, scope }) => {
        const payment: any = parent.$source

        const idFieldName = <keyof Payment>`${fieldName}Id`

        const user = await getUser(
          { where: { id: { eq: payment[idFieldName] } } },
          scope
        )

        return mapUser(user)
      })
    )
}

const PaymentType = Type('Payment', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    postedOn: field.ofDate(),
    amount: field.ofFloat(),
    description: field.ofString().nullable(),
    verified: field.ofBool(),
    pending: field.ofBool(),
    bankDescription: field
      .ofString()
      .nullable()
      .resolve(
        createResolver('Payment:bankDescription', ({ parent }) => {
          return parent.data ? parent.data.originalDescription : null
        })
      ),
    rawPeerName: field
      .ofString()
      .nullable()
      .resolve(
        createResolver('Payment:rawPeerName', ({ parent }) => {
          return parent.data ? parent.data.description : null
        })
      ),
    similar: field
      .listOf(PaymentType)
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
        includeSelf: arg.ofBool(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PaymentsOrderType),
      }))
      .resolve(
        createResolver('Payment:similar', async ({ parent, args, scope }) => {
          const payment: Payment = parent.$source

          const payments = await listSimilarPaymentsById(
            {
              id: payment.id,
              includeSelf: args.includeSelf,
              where: createPaymentWhere(args),
              take: args.take,
              skip: args.skip,
              orderBy: args.sortBy,
            },
            scope
          )

          return mapPayment(payments)
        })
      ),
    similarDateRange: field
      .listOfDate()
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
        includeSelf: arg.ofBool(),
      }))
      .resolve(
        createResolver<null | Date[]>(
          'Payment:similarDateRange',
          async ({ parent, args, scope }) => {
            const payment: Payment = parent.$source

            const range = await getSimilarPaymentDateRangeById(
              {
                id: payment.id,
                includeSelf: args.includeSelf,
                where: createPaymentWhere(args),
              },
              scope
            )

            return range
          }
        )
      ),
    countSimilar: field
      .ofInt()
      .args(arg => ({
        ...paymentsDefaultFilters(arg),
        includeSelf: arg.ofBool(),
      }))
      .resolve(
        createResolver('Payment:countSimilar', ({ parent, args, scope }) => {
          const count = countSimilarPaymentsByPid(
            {
              paymentPid: parent.pid,
              includeSelf: args.includeSelf,
              where: createPaymentWhere(args),
            },
            scope
          )

          return count
        })
      ),
    source: field.ofType(SourceType).resolve(
      createResolver('Payment:source', async ({ parent, scope }) => {
        const payment: Payment = parent.$source
        
        if (!payment.source) {
          return null
        }

        const source = await getSource(
          { where: { id: { eq: payment.sourceId } } },
          scope
        )

        return mapSource(source)
      })
    ),
    account: field.ofType(AccountType).resolve(
      createResolver('Payment:account', async ({ parent, scope }) => {
        const payment: Payment = parent.$source

        const account = await getAccount(
          {
            userId: scope.user && scope.user.id,
            where: { id: { eq: payment.accountId } },
          },
          scope
        )

        return mapAccount(account)
      })
    ),
    peer: field
      .ofType(PeerType)
      .nullable()
      .resolve(
        createResolver('Payment:peer', async ({ parent, scope }) => {
          const payment: Payment = parent.$source

          if (payment.peerId) {
            const peer = await getPeer(
              { where: { id: { eq: payment.peerId } } },
              scope
            )

            return mapPeer(peer)
          } else if (payment.peerName) {
            return { name: payment.peerName }
          } else {
            return null
          }
        })
      ),
    category: field
      .ofType(CategoryType)
      .nullable()
      .resolve(
        createResolver('Payment:category', async ({ parent, scope }) => {
          const payment: Payment = parent.$source

          const category = await getCategory(
            { where: { id: { eq: payment.categoryId } } },
            scope
          )

          return mapCategory(category)
        })
      ),
    descriptionUpdater: updaterConstructor(field, 'descriptionUpdater'),
    peerUpdater: updaterConstructor(field, 'peerUpdater'),
    categoryUpdater: updaterConstructor(field, 'categoryUpdater'),
    suggestedDescriptions: field
      .listOf(PaymentSuggestedDescriptionType)
      .args(arg => ({
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createResolver(
          'Account:suggestedDescriptions',
          ({ parent, args: { search }, scope }) => {
            const payment: Payment = parent.$source

            // if inputted search text peerId and categoryId are skipped
            const args =
              R.isNil(search) || R.isEmpty(search)
                ? {
                    accountId: payment.accountId,
                    peerId: payment.peerId,
                    categoryId: payment.categoryId,
                  }
                : {
                    accountId: payment.accountId,
                    search,
                  }

            return listPaymentDescriptionsByAccountId(args, scope)
          }
        )
      ),
  }))
)

export default PaymentType
