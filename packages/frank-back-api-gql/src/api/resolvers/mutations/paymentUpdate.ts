import R from 'ramda'
import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getAccountByPid from 'api/dal/Account/getAccountByPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import { throwArgumentError } from 'api/errors/ArgumentError'
import lastPublishedPaymentByAccountId from 'api/dal/Payment/lastPublishedPaymentByAccountId'
import Id from 'store/types/Id'
import { SystemUserId } from 'store/enums'
import getCategory from 'api/dal/Category/getCategory'
import getPeer from 'api/dal/Peer/getPeer'
import Payment from 'store/types/Payment'

const handleString = (s: string | undefined | null) => {
  if (R.isNil(s)) {
    return s
  }

  s = s.trim()

  return R.isEmpty(s) ? null : s
}

const canSuggestCategory = (
  payment: Payment,
  inputCategoryPid: any
): boolean => {
  return (
    inputCategoryPid === undefined && // user don't set new category
    (R.isNil(payment.categoryId) || // category empty
      R.contains(payment.categoryUpdaterId, [
        SystemUserId.import,
        SystemUserId.suggestion,
      ])) // category was installed by AI (lol)
  )
}

const canSuggestPeer = (
  payment: Payment,
  inputPeerPid: any,
  inputPeerName: any
): boolean => {
  return (
    inputPeerPid === undefined &&
    inputPeerName === undefined && // user don't set new peer
    (R.isNil(payment.peerId) || // peer empty
      R.contains(payment.peerUpdaterId, [
        SystemUserId.import,
        SystemUserId.suggestion,
      ])) // peer was installed by AI (lol)
  )
}

const canSuggestDescription = (
  payment: Payment,
  inputDescription: any
): boolean => {
  return (
    inputDescription === undefined && // user don't set new description
    (R.isNil(payment.description) || // description empty
      R.contains(payment.descriptionUpdaterId, [
        SystemUserId.import,
        SystemUserId.suggestion,
      ])) // description was installed by AI (lol)
  )
}

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
    if (categoryPid === null) {
      throwArgumentError()
    }

    const account = await getAccountByPid({ pid: accountPid }, scope)
    const payment = await getPaymentByPidAndAccountId(
      { accountId: account.id, pid: paymentPid },
      scope
    )

    description = handleString(description)
    peerName = handleString(peerName)

    let peerId: Id | null | undefined = peerPid === null ? null : undefined
    let categoryId: Id | null | undefined =
      categoryPid === null ? null : undefined

    let peerUpdaterId: Id | undefined
    let categoryUpdaterId: Id | undefined
    let descriptionUpdaterId: Id | undefined

    if (peerPid) {
      // set new peer
      const peer = await getPeer(
        {
          where: {
            account: { id: { eq: account.id } },
            pid: { eq: peerPid },
          },
        },
        scope
      )

      peerId = peer.id
      peerUpdaterId = scope.user.id
    }

    if (categoryPid) {
      // set new category
      const category = await getCategory(
        {
          where: {
            account: { id: { eq: account.id } },
            pid: { eq: categoryPid },
          },
        },
        scope
      )

      categoryId = category.id
      categoryUpdaterId = scope.user.id
    }

    if (description !== undefined) {
      descriptionUpdaterId = scope.user.id
    }

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
      if (canSuggestCategory(payment, categoryPid)) {
        categoryId = similarPayment.categoryId
        categoryUpdaterId = SystemUserId.suggestion
      }

      if (canSuggestPeer(payment, peerPid, peerName)) {
        peerId = similarPayment.peerId
        peerUpdaterId = SystemUserId.suggestion
      }

      if (canSuggestDescription(payment, description)) {
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
