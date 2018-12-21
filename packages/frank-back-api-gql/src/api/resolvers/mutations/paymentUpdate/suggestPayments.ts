import Scope from 'api/Scope'
import Payment from 'store/types/Payment'
import { SystemUserId } from 'store/enums'
import listPayments from 'api/dal/Payment/listPayments'
import distance from 'damerau-levenshtein'
import R from 'ramda'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import {
  canSuggestCategory,
  canSuggestDescription,
  canSuggestPeer,
} from './canSuggest'

const SIMILAR_LIMIT = process.env.SIMILAR_LIMIT || 0.8
const SIMILAR_AMOUNT_PERCENT =
  (process.env.SIMILAR_AMOUNT_PERCENT &&
    parseInt(process.env.SIMILAR_AMOUNT_PERCENT, 10)) ||
  10

const updatePaymentIfNeeded = async (
  payment: Payment,
  originalPayment: Payment,
  scope: Scope
) => {
  let needUpdate = false
  let categoryId
  let categoryUpdaterId
  let peerId
  let peerName
  let peerUpdaterId
  let description
  let descriptionUpdaterId

  const canSuggestParams = {
    existingPayment: payment,
    userInput: {},
  }

  if (canSuggestCategory(canSuggestParams)) {
    needUpdate = true
    categoryId = originalPayment.categoryId
    categoryUpdaterId = SystemUserId.suggestion
  }

  if (canSuggestPeer(canSuggestParams)) {
    needUpdate = true
    peerId = originalPayment.peerId
    peerName = originalPayment.peerName
    peerUpdaterId = SystemUserId.suggestion
  }

  if (canSuggestDescription(canSuggestParams)) {
    needUpdate = true
    description = originalPayment.description
    descriptionUpdaterId = SystemUserId.suggestion
  }

  if (needUpdate) {
    return await updatePaymentByPidAndAccountPid(
      {
        paymentId: payment.id,
        description,
        peerName,
        peerId,
        categoryId,
        peerUpdaterId,
        categoryUpdaterId,
        descriptionUpdaterId,
      },
      scope
    )
  }
}

const suggestPayments = async (originalPayment: Payment, scope: Scope) => {
  const amount = originalPayment.amount

  const rightAmount = amount + (amount * SIMILAR_AMOUNT_PERCENT) / 100
  const leftAmount = amount - (amount * SIMILAR_AMOUNT_PERCENT) / 100

  const newPaymentsWihSameAmount = await listPayments(
    {
      where: {
        account: { id: { eq: originalPayment.accountId } },
        verified: { eq: false },
        amount: {
          gte: Math.min(rightAmount, leftAmount),
          lte: Math.max(rightAmount, leftAmount),
        },
      },
      orderBy: 'postedOn_ASC',
    },
    scope
  )

  const similarFilter = (itemPayment: Payment) =>
    itemPayment.data &&
    originalPayment.data &&
    distance(
      itemPayment.data.originalDescription,
      originalPayment.data.originalDescription
    ).similarity >= SIMILAR_LIMIT

  const similarPayments = R.filter(similarFilter, newPaymentsWihSameAmount)

  const result: Payment[] = []

  for (const itemPayment of similarPayments) {
    const updatedPayment = await updatePaymentIfNeeded(
      itemPayment,
      originalPayment,
      scope
    )

    if (updatedPayment) {
      result.push(updatedPayment)
    }
  }

  return result
}

export default suggestPayments
