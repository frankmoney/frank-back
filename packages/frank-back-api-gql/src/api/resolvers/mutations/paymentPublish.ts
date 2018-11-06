import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getAccountByPid from 'api/dal/Account/getAccountByPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import { throwArgumentError } from 'api/errors/ArgumentError'
import R from 'ramda'
import findOrCreatePeer from '../../dal/Peer/findOrCreatePeer'

const paymentPublish = createPrivateResolver(
  'Mutation:paymentPublish',
  async ({ args: { accountPid, paymentPid }, scope }) => {
    const account = await getAccountByPid({ pid: accountPid }, scope)
    const payment = await getPaymentByPidAndAccountId(
      { accountId: account.id, pid: paymentPid },
      scope
    )

    if (
      R.isNil(payment.description) ||
      R.isNil(payment.categoryId) ||
      (R.isNil(payment.peerName) && R.isNil(payment.peerId))
    ) {
      throwArgumentError()
    }

    let peerId = payment.peerId

    if (R.isNil(peerId)) {
      peerId = await findOrCreatePeer(
        { accountId: account.id, name: payment.peerName },
        scope
      )
    }

    return mapPayment(
      await updatePaymentByPidAndAccountPid(
        {
          paymentId: payment.id,
          published: true,
          peerId,
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  paymentPublish: field
    .ofType(PaymentType)
    .args(arg => ({
      accountPid: arg.ofId(),
      paymentPid: arg.ofId(),
    }))
    .resolve(paymentPublish),
}))
