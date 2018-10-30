import createMutations from 'utils/createMutations'
import updatePaymentByPidAndAccountPid from 'api/dal/Payment/updatePaymentByPidAndAccountPid'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'

const paymentUpdate = createPrivateResolver(
  'Mutation:paymentUpdate',
  async ({ args, scope }) => {
    return mapPayment(await updatePaymentByPidAndAccountPid(args, scope))
  }
)

export default createMutations(field => ({
  paymentUpdate: field
    .ofType(PaymentType)
    .args(arg => ({
      accountPid: arg.ofId(),
      paymentPid: arg.ofId(),
      published: arg.ofBool().nullable(),
      description: arg.ofString().nullable(),
      categoryPid: arg.ofId().nullable(),
      peerPid: arg.ofId().nullable(),
      newPeerName: arg.ofString().nullable(),
    }))
    .resolve(paymentUpdate),
}))
