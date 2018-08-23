import {
  PaymentUpdateInput,
  PaymentWhereUniqueInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'updatePayments',
  async ({
    assert,
    args: { accountId, updates },
    prisma: { query, mutation },
    info,
  }) => {
    await assert.accountAccess(accountId)

    const paymentIds = updates.map((x: { paymentId: string }) => x.paymentId)

    const payments = await query.payments(
      {
        where: {
          id_in: paymentIds,
          account: { id: accountId },
        },
      },
      `{
        id
        category {
          id
        }
      }`
    )

    for (const { id, category } of payments) {
      const { categoryId } = updates.filter(
        (x: { paymentId: string }) => x.paymentId === id
      )[0]
      if (((category && category.id) || null) !== categoryId) {
        const where: PaymentWhereUniqueInput = { id }

        const data: PaymentUpdateInput = {
          category: {
            connect: {
              id: categoryId,
            },
          },
        }

        await mutation.updatePayment({ where, data })
      }
    }

    const result = await query.payments(
      { where: { id_in: payments.map(x => x.id) } },
      info
    )

    return result
  }
)
