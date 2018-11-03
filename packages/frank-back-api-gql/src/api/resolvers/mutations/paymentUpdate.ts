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
import getCategoryByPidAndAccountId from 'api/dal/Category/getCategoryByPidAndAccountId'
import getPeerByPidAndAccountId from 'api/dal/Peer/getPeerByPidAndAccountId'
import Payment from 'store/types/Payment'

const handleString = (s: string | undefined | null) => {
  if (R.isNil(s)) {
    return s
  }

  s = s.trim()

  return R.isEmpty(s) ? null : s
}

const canSuggestCategory = (payment: Payment, inputCategoryPid: any): boolean => {

  return (
    inputCategoryPid === undefined // user don't set new category
    && (
      R.isNil(payment.categoryId)  // category empty
      || R.contains(payment.categoryUpdaterId, [SystemUserId.import])  // category was installed by AI (lol)
    )
  )
}

const canSuggestDescription = (payment: Payment, inputDescription: any): boolean => {

  return (
    inputDescription === undefined // user don't set new description
    && (
      R.isNil(payment.description)  // description empty
      || R.contains(payment.descriptionUpdaterId, [SystemUserId.import])  // description was installed by AI (lol)
    )
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
           },
           scope,
         }) => {
    if (categoryPid === null) {
      throwArgumentError()
    }

    const account = await getAccountByPid({ pid: accountPid }, scope)
    const payment = await getPaymentByPidAndAccountId(
      { accountId: account.id, pid: paymentPid },
      scope,
    )

    description = handleString(description)
    peerName = handleString(peerName)

    let peerId: Id | null | undefined = peerPid === null ? null : undefined
    let categoryId: Id | null | undefined = categoryPid === null ? null : undefined

    let peerUpdaterId: Id | undefined
    let categoryUpdaterId: Id | undefined
    let descriptionUpdaterId: Id | undefined


    if (peerPid) { // set new peer

      const peer = await getPeerByPidAndAccountId({ accountId: account.id, pid: peerPid }, scope)

      peerId = peer.id
      peerUpdaterId = scope.user.id

    }

    if (categoryPid) {  // set new category

      const category = await getCategoryByPidAndAccountId({ accountId: account.id, pid: categoryPid }, scope)

      categoryId = category.id
      categoryUpdaterId = scope.user.id
    }


    const similarPayment = await lastPublishedPaymentByAccountId({
      accountId: account.id,
      amount: payment.amount,
      peerId,
      categoryId,
    }, scope)


    if (similarPayment) {

      if (canSuggestCategory(payment, categoryPid)) {

        categoryId = similarPayment.categoryId
        categoryUpdaterId = SystemUserId.import
      }

      if (canSuggestDescription(payment, description)) {

        description = similarPayment.description
        descriptionUpdaterId = SystemUserId.import
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
        },
        scope,
      ),
    )
  },
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
    }))
    .resolve(paymentUpdate),
}))
