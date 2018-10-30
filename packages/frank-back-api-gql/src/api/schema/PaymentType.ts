import { Type } from 'gql'
import Payment from 'store/types/Payment'
import getAccountByPaymentId from 'api/dal/Account/getAccountByPaymentId'
import getCategoryByPaymentId from 'api/dal/Category/getCategoryByPaymentId'
import getPeerByPaymentId from 'api/dal/Peer/getPeerByPaymentId'
import countSimilarPaymentsByPid from 'api/dal/Payment/countSimilarPaymentsByPid'
import mapAccount from 'api/mappers/mapAccount'
import mapCategory from 'api/mappers/mapCategory'
import mapPeer from 'api/mappers/mapPeer'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import AccountType from './AccountType'
import CategoryType from './CategoryType'
import PeerType from './PeerType'

const PaymentType = Type('Payment', type =>
  type.fields(field => ({
    pid: field.ofId(),
    data: field.ofJson().nullable(),
    postedOn: field.ofDate(),
    amount: field.ofFloat(),
    rawPeerName: field.ofString().nullable(),
    description: field.ofString().nullable(),
    published: field.ofBool(),
    bankDescription: field
      .ofString()
      .nullable()
      .resolve(
        createPrivateResolver('Payment:bankDescription', ({ parent }) => {
          return parent.data ? parent.data.originalDescription : null
        })
      ),
    countSimilar: field.ofInt().resolve(
      createPrivateResolver('Payment:countSimilar', ({ parent, scope }) => {
        return countSimilarPaymentsByPid({ paymentPid: parent.pid }, scope)
      })
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
  }))
)

export default PaymentType
