import createMutations from 'utils/createMutations'
import mapPayment from 'api/mappers/mapPayment'
import getAccount from 'api/dal/Account/getAccount'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import PaymentUpdateResultType from 'api/schema/PaymentUpdateResultType'
import Payment from 'store/types/Payment'
import R from 'ramda'
import paymentUpdate from './paymentUpdate'
import suggestPayments from './suggestPayments'

const paymentsUpdate = createPrivateResolver(
  'Mutation:paymentUpdate',
  async ({
    args: {
      accountPid,
      paymentsPids,
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

    const paymentUpdateArgs = {
      account,
      description,
      peerName,
      categoryPid,
      verified,
    }

    const updatedPayments: Payment[] = []

    for (const paymentPid of paymentsPids) {
      updatedPayments.push(
        await paymentUpdate(
          {
            ...paymentUpdateArgs,
            paymentPid,
          },
          scope
        )
      )
    }

    await scope.uow.commit()

    let suggestedPayments: Payment[] = []

    if (verified === true) {
      for (const payment of updatedPayments) {
        suggestedPayments.push(...(await suggestPayments(payment, scope)))
      }

      suggestedPayments = R.uniqBy(R.prop('id'), suggestedPayments)
    }

    return {
      payments: mapPayment(updatedPayments),
      suggestedPayments: mapPayment(suggestedPayments),
    }
  }
)

export default createMutations(field => ({
  paymentsUpdate: field
    .ofType(PaymentUpdateResultType)
    .args(arg => ({
      accountPid: arg.ofId(),
      paymentsPids: arg.listOfId(),
      description: arg.ofString().nullable(),
      peerName: arg.ofString().nullable(),
      categoryPid: arg.ofId().nullable(),
      verified: arg.ofBool().nullable(),
    }))
    .resolve(paymentsUpdate),
}))
