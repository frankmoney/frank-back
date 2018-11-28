import { Type } from 'gql'
import ObjectTypeFieldBuilder from 'gql/nodes/ObjectTypeFieldBuilder'
import Payment from 'store/types/Payment'
import undefinedIfNull from 'utils/undefinedIfNull'
import getAccountByPaymentId from 'api/dal/Account/getAccountByPaymentId'
import getCategoryByPaymentId from 'api/dal/Category/getCategoryByPaymentId'
import listSimilarPaymentsById from 'api/dal/Payment/listSimilarPaymentsById'
import getPeerByPaymentId from 'api/dal/Peer/getPeerByPaymentId'
import getUserById from 'api/dal/User/getUserById'
import countSimilarPaymentsByPid from 'api/dal/Payment/countSimilarPaymentsByPid'
import listPaymentDescriptionsByAccountId from 'api/dal/Payment/listPaymentDescriptionsByAccountId'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPayment from 'api/mappers/mapPayment'
import mapPeer from 'api/mappers/mapPeer'
import mapUser from 'api/mappers/mapUser'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import CategoryType from './CategoryType'
import PaymentsOrderType from './PaymentsOrderType'
import PaymentSuggestedDescriptionType from './PaymentSuggestedDescriptionType'
import UserType from './UserType'
import PeerType from './PeerType'
import createPaymentWhere from './helpers/createPaymentWhere'
import R from 'ramda'

const updaterConstructor = (
  field: ObjectTypeFieldBuilder,
  fieldName: string
) => {
  return field
    .ofType(UserType)
    .nullable()
    .resolve(
      createPrivateResolver(
        `Payment:${fieldName}`,
        async ({ parent, scope }) => {
          const payment: any = parent.$source

          const idFieldName = <keyof Payment>`${fieldName}Id`

          const user = await getUserById({ id: payment[idFieldName] }, scope)

          return mapUser(user)
        }
      )
    )
}

const PaymentType = Type('Payment', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    postedOn: field.ofDate(),
    amount: field.ofFloat(),
    peerName: field.ofString().nullable(),
    description: field.ofString().nullable(),
    verified: field.ofBool(),
    bankDescription: field
      .ofString()
      .nullable()
      .resolve(
        createPrivateResolver('Payment:bankDescription', ({ parent }) => {
          return parent.data ? parent.data.originalDescription : null
        })
      ),
    similar: field
      .listOf(PaymentType)
      .args(arg => ({
        includeSelf: arg.ofBool(),
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        verified: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
        take: arg.ofInt().nullable(),
        skip: arg.ofInt().nullable(),
        sortBy: arg.ofType(PaymentsOrderType),
      }))
      .resolve(
        createPrivateResolver(
          'Payment:similar',
          async ({ parent, args, scope }) => {
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
          }
        )
      ),
    countSimilar: field
      .ofInt()
      .args(arg => ({
        includeSelf: arg.ofBool(),
        postedOnMin: arg.ofDate().nullable(),
        postedOnMax: arg.ofDate().nullable(),
        amountMin: arg.ofFloat().nullable(),
        amountMax: arg.ofFloat().nullable(),
        verified: arg.ofBool().nullable(),
        search: arg.ofString().nullable(),
      }))
      .resolve(
        createPrivateResolver(
          'Payment:countSimilar',
          ({ parent, args, scope }) => {
            const count = countSimilarPaymentsByPid(
              {
                paymentPid: parent.pid,
                includeSelf: args.includeSelf,
                where: createPaymentWhere(args),
              },
              scope
            )

            return count
          }
        )
      ),
    account: field.ofType(AccountType).resolve(
      createPrivateResolver('Payment:account', async ({ parent, scope }) => {
        const payment: Payment = parent.$source

        const account = await getAccountByPaymentId(
          { paymentId: payment.id },
          scope
        )

        return mapAccount(account)
      })
    ),
    peer: field
      .ofType(PeerType)
      .nullable()
      .resolve(
        createPrivateResolver('Payment:peer', async ({ parent, scope }) => {
          const payment: Payment = parent.$source

          const peer = await getPeerByPaymentId(
            { paymentId: payment.id },
            scope
          )

          return mapPeer(peer)
        })
      ),
    category: field
      .ofType(CategoryType)
      .nullable()
      .resolve(
        createPrivateResolver('Payment:category', async ({ parent, scope }) => {
          const payment: Payment = parent.$source

          const category = await getCategoryByPaymentId(
            { paymentId: payment.id },
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
        createPrivateResolver(
          'Account:suggestedDescriptions',
          ({ parent, args: { search }, scope }) => {
            const payment: Payment = parent.$source

            // if inputted search text peerId and categoryId are skipped
            const args = R.isNil(search)
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
