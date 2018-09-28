import { format } from 'date-fns'
import {
  Payment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'Peer:lastPaymentOn',
  async ({ parent, args, prisma: { query } }) => {
    const first = 1

    const orderBy: PaymentOrderByInput = 'postedOn_DESC'

    let where: PaymentWhereInput | undefined

    if (args.incomes) {
      if (!args.expenses) {
        where = { amount_gt: 0 }
      }
    } else if (args.expenses) {
      where = { amount_lt: 0 }
    }

    let value: string | undefined

    if (where) {
      const payments = await query.payments<Payment[]>({
        where,
        first,
        orderBy,
      })
      value =
        (payments &&
          payments[0] &&
          payments[0].postedOn &&
          format(payments[0].postedOn)) ||
        undefined
    } else {
      value = format(parent.lastPaymentDate)
    }

    return { value }
  }
)
