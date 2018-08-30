import { Payment, PaymentWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'Account:countRevenue',
  async ({ parent, args, prisma: { query } }) => {
    const accountId = parent.id

    const where: PaymentWhereInput = {
      account: {
        id: accountId,
      },
      amount_gt: 0,
    }

    if (args.peerId) {
      where.peer = {
        id: args.peerId,
      }
    }

    if (args.categoryId) {
      where.category = {
        id: args.categoryId,
      }
    }

    const payments = await query.payments<Payment[]>({ where })

    const value = payments.reduce((a, b) => a + b.amount, 0)

    return { value }
  }
)
