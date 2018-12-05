import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getAccountByPid from 'api/dal/Account/getAccountByPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import lastPublishedPaymentByAccountId from 'api/dal/Payment/lastPublishedPaymentByAccountId'
import { SystemUserId } from 'store/enums'
import {
  canSuggestCategory,
  canSuggestDescription,
  canSuggestPeer,
} from './canSuggest'
import processingUserInput from './processingUserInput'

const paymentUpdate = createPrivateResolver(
  'Mutation:paymentUpdate',
  async ({
    args: {
      accountPid,
      paymentPid,
      description,
      peerPid,
      peerName,
      categoryPid,
      verified,
    },
    scope,
  }) => {
    const account = await getAccountByPid({ pid: accountPid }, scope)
    const payment = await getPaymentByPidAndAccountId(
      { accountId: account.id, pid: paymentPid },
      scope
    )

    const processedUserInput = await processingUserInput({
      description,
      peerName,
      peerPid,
      categoryPid,
      accountId: account.id,
      scope,
    })

    description = processedUserInput.description
    peerName = processedUserInput.peerName

    let {
      peerId,
      categoryId,
      peerUpdaterId,
      categoryUpdaterId,
      descriptionUpdaterId,
    } = processedUserInput

    const similarPayment = await lastPublishedPaymentByAccountId(
      {
        accountId: account.id,
        amount: payment.amount,
        peerId,
        categoryId,
        description,
      },
      scope
    )

    if (similarPayment) {
      const canSuggestParams = {
        existingPayment: payment,
        userInput: {
          categoryPid,
          peerPid,
          peerName,
          description,
        },
      }

      if (canSuggestCategory(canSuggestParams)) {
        categoryId = similarPayment.categoryId
        categoryUpdaterId = SystemUserId.suggestion
      }

      if (canSuggestPeer(canSuggestParams)) {
        peerId = similarPayment.peerId
        peerUpdaterId = SystemUserId.suggestion
      }

      if (canSuggestDescription(canSuggestParams)) {
        description = similarPayment.description
        descriptionUpdaterId = SystemUserId.suggestion
      }
    }

    return mapPayment(
      await updatePaymentByPidAndAccountPid(
        {
          paymentId: payment.id,
          description,
          peerName,
          peerId,
          categoryId,
          peerUpdaterId,
          categoryUpdaterId,
          descriptionUpdaterId,
          verified,
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  paymentUpdate: field
    .ofType(PaymentType)
    .args(arg => ({
      accountPid: arg.ofId(),
      paymentPid: arg.ofId(),
      description: arg.ofString().nullable(),
      peerPid: arg.ofId().nullable(),
      peerName: arg.ofString().nullable(),
      categoryPid: arg.ofId().nullable(),
      verified: arg.ofBool().nullable(),
    }))
    .resolve(paymentUpdate),
}))
