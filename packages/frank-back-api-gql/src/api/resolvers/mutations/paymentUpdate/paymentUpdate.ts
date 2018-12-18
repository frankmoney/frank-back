import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import findOrCreatePeer from 'api/dal/Peer/findOrCreatePeer'
import mapPayment from 'api/mappers/mapPayment'
import getAccount from 'api/dal/Account/getAccount'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import lastVerifiedPaymentByAccountId from 'api/dal/Payment/lastVerifiedPaymentByAccountId'
import { SystemUserId } from 'store/enums'
import { argumentError } from 'api/errors/ArgumentError'
import PaymentUpdateResultType from 'api/schema/PaymentUpdateResultType'
import Payment from 'store/types/Payment'
import {
  canSuggestCategory,
  canSuggestDescription,
  canSuggestPeer,
} from './canSuggest'
import processingUserInput from './processingUserInput'
import suggestPayments from './suggestPayments'

const paymentUpdate = createPrivateResolver(
  'Mutation:paymentUpdate',
  async ({
    args: {
      accountPid,
      paymentPid,
      description,
      peerName,
      categoryPid,
      verified,
    },
    scope,
  }) => {
    const account = await getAccount(
      {
        where: { pid: { eq: accountPid } },
        userId: scope.user.id,
      },
      scope
    )

    const payment = await getPaymentByPidAndAccountId(
      { accountId: account.id, pid: paymentPid },
      scope
    )

    const processedUserInput = await processingUserInput({
      existingPayment: payment,
      scope,
      userInput: {
        description,
        peerName,
        categoryPid,
      },
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

    const actualCategoryId =
      categoryId === undefined ? payment.categoryId : categoryId
    const actualPeerId = peerId === undefined ? payment.peerId : peerId
    const actualDescription =
      description === undefined ? payment.description : description

    const similarPayment = await lastVerifiedPaymentByAccountId(
      {
        accountId: account.id,
        amount: payment.amount,
        peerId: actualPeerId,
        categoryId: actualCategoryId,
        description: actualDescription,
      },
      scope
    )

    if (similarPayment) {
      const canSuggestParams = {
        existingPayment: payment,
        userInput: {
          categoryId,
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
        peerName = similarPayment.peerName
        peerUpdaterId = SystemUserId.suggestion
      }

      if (canSuggestDescription(canSuggestParams)) {
        description = similarPayment.description
        descriptionUpdaterId = SystemUserId.suggestion
      }
    }

    const actualVerified = verified === undefined ? payment.verified : verified

    if (actualVerified) {
      if (!actualCategoryId) {
        throw argumentError('category is undefined')
      }

      if (!actualDescription) {
        throw argumentError('description is undefined')
      }

      if (!actualPeerId) {
        const actualPeerName =
          peerName === undefined ? payment.peerName : peerName

        if (!actualPeerName) {
          throw argumentError('peer is undefined')
        }

        peerId = await findOrCreatePeer(
          {
            accountId: account.id,
            name: actualPeerName,
            create: true,
          },
          scope
        )
      }
    }

    const updatedPayment = await updatePaymentByPidAndAccountPid(
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

    let suggestedPayments: Payment[] = []

    if (actualVerified) {
      suggestedPayments = await suggestPayments(updatedPayment, scope)
    }

    return {
      payment: mapPayment(updatedPayment),
      suggestedPayments: mapPayment(suggestedPayments),
    }
  }
)

export default createMutations(field => ({
  paymentUpdate: field
    .ofType(PaymentUpdateResultType)
    .args(arg => ({
      accountPid: arg.ofId(),
      paymentPid: arg.ofId(),
      description: arg.ofString().nullable(),
      peerName: arg.ofString().nullable(),
      categoryPid: arg.ofId().nullable(),
      verified: arg.ofBool().nullable(),
    }))
    .resolve(paymentUpdate),
}))
