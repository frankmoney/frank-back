import createMutations from 'utils/createMutations'
import updatePaymentByPid from 'api/dal/Payment/updatePaymentByPid'
import mapPayment from 'api/mappers/mapPayment'
import PaymentType from 'api/schema/PaymentType'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'

const paymentUpdate = createPrivateResolver(
  'Mutation:paymentUpdate',
  async ({ args: { pid, published }, scope }) => {
    return mapPayment(
      await updatePaymentByPid(
        {
          pid,
          published,
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
      pid: arg.ofId(),
      published: arg.ofBool().nullable(),
      description: arg.ofString().nullable(),
      categoryPid: arg.ofId().nullable(),
      peerPid: arg.ofId().nullable(),
    }))
    .resolve(paymentUpdate),
}))
