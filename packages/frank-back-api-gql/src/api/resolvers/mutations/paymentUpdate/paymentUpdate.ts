import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getAccountByPid from 'api/dal/Account/getAccountByPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import findOrCreatePeer from 'api/dal/Peer/findOrCreatePeer'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import lastVerifiedPaymentByAccountId from 'api/dal/Payment/lastVerifiedPaymentByAccountId'
import { SystemUserId } from 'store/enums'
import { argumentError } from 'api/errors/ArgumentError'
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

    const similarPayment = await lastVerifiedPaymentByAccountId(
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

    if (verified || payment.verified) {
      const actualCategoryId =
        categoryId === undefined ? payment.categoryId : categoryId
      const actualPeerId = peerId === undefined ? payment.peerId : peerId
      const actualDescription =
        description === undefined ? payment.description : description

      if (!actualCategoryId) {
        argumentError('category is undefined')
      }

      if (!actualDescription) {
        argumentError('description is undefined')
      }

      if (!actualPeerId) {
        const actualPeerName =
          peerName === undefined ? payment.peerName : peerName

        if (!actualPeerName) {
          argumentError('peer is undefined')
        }

        peerId = await findOrCreatePeer(
          {
            accountId: account.id,
            name: actualPeerName,
          },
          scope
        )
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
