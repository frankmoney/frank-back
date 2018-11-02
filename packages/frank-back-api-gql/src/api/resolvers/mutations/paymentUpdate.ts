import R from 'ramda'
import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import getAccountByPid from 'api/dal/Account/getAccountByPid'
import getPaymentByPidAndAccountId from 'api/dal/Payment/getPaymentByPidAndAccountId'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import { throwArgumentError } from 'api/errors/ArgumentError'

const handleString = (s: string | undefined | null) => {
  if (R.isNil(s)) {
    return s
  }

  s = s.trim()

  return R.isEmpty(s) ? null : s
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
      scope
    )

    description = handleString(description)
    peerName = handleString(peerName)

    return mapPayment(
      await updatePaymentByPidAndAccountPid(
        {
          paymentId: payment.id,
          description,
          peerName,
          // categoryPid,
          // peerPid,
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
    }))
    .resolve(paymentUpdate),
}))
