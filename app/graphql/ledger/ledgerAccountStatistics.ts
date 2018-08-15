import * as R from 'ramda'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'ledgerAccountStatistics',
  async ({ assert, args: { accountId }, prisma }) => {
    await assert.accountAccess(accountId)

    const result = await prisma.request(
      `
      query($accountId: ID!) {
        paymentAmountMin: payments(
          where: {
            account: { id: $accountId }
          }
          orderBy: amount_ASC
          first: 1
        ) {
          amount
        }
        
        paymentAmountMax: payments(
          where: {
            account: { id: $accountId }
          }
          orderBy: amount_DESC
          first: 1
        ) {
          amount
        }
        
        paymentDateMin: payments(
          where: {
            account: { id: $accountId }
          }
          orderBy: postedDate_ASC
          first: 1
        ) {
          postedDate
        }
      }
      `,
      { accountId }
    )

    return {
      paymentAmountMin: R.path(['paymentAmountMin', 0, 'amount'], result),
      paymentAmountMax: R.path(['paymentAmountMax', 0, 'amount'], result),
      paymentDateMin: R.path(['paymentDateMin', 0, 'postedDate'], result),
    }
  }
)
