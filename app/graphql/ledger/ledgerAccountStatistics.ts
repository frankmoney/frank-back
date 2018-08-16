import * as R from 'ramda'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'ledgerAccountStatistics',
  async ({ assert, args: { accountId, categoryId }, prisma }) => {
    await assert.accountAccess(accountId)

    const params = categoryId
      ? '$accountId: ID!, $categoryId: ID'
      : '$accountId: ID!'

    const where = categoryId
      ? `where: {
        account: { id: $accountId }
        category: { id: $categoryId }
      }`
      : `where: {
        account: { id: $accountId }
      }`

    const result = await prisma.request(
      `
      query(${params}) {
        paymentAmountMin: payments(
          ${where}
          orderBy: amount_ASC
          first: 1
        ) {
          amount
        }
        
        paymentAmountMax: payments(
          ${where}
          orderBy: amount_DESC
          first: 1
        ) {
          amount
        }
        
        paymentDateMin: payments(
          ${where}
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
