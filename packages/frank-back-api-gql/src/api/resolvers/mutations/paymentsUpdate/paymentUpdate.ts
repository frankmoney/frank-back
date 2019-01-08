import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import findOrCreatePeer from 'api/dal/Peer/findOrCreatePeer'
import Scope from 'api/Scope'
import lastVerifiedPaymentByAccountId from 'api/dal/Payment/lastVerifiedPaymentByAccountId'
import { SystemUserId } from 'store/enums'
import { argumentError } from 'api/errors/ArgumentError'
import Payment from 'store/types/Payment'
import Account from 'store/types/Account'
import Pid from 'store/types/Pid'
import {
  canSuggestCategory,
  canSuggestDescription,
  canSuggestPeer,
} from './canSuggest'
import processingUserInput from './processingUserInput'

type Args = {
  account: Account
  paymentPid: Pid
  description: any
  peerName: any
  categoryPid: any
  verified: any
}

export default async (args: Args, scope: Scope): Promise<Payment> => {
  const { account, paymentPid, categoryPid, verified } = args
  let { description, peerName } = args

  const payment = await getPaymentByPidAndAccountId(
    { accountId: account.id, pid: paymentPid },
    scope
  )

  if (!payment) {
    throw argumentError(`Payment not found; paymentPid=${paymentPid}`)
  }

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

  return updatedPayment
}
