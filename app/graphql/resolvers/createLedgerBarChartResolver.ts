import { addMonths, format } from 'date-fns'
import { isNil } from 'ramda'
import {
  Payment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

type LedgerBarChartItem = {
  date: string
  revenue: number
  spending: number
}

const createLedgerBarChartResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => PaymentWhereInput | Promise<PaymentWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      args,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    if (!isNil(args.postedOnMin)) {
      where.postedOn_gte = args.postedOnMin
    }

    if (!isNil(args.postedOnMax)) {
      where.postedOn_lte = args.postedOnMax
    }

    if (!isNil(args.amountMin)) {
      where.amount_gte = args.amountMin
    }

    if (!isNil(args.amountMax)) {
      where.amount_lte = args.amountMax
    }

    const orderBy: PaymentOrderByInput = 'postedOn_ASC'

    const payments = await query.payments<Payment[]>(
      { where, orderBy },
      `{
      postedOn
      amount
    }`
    )

    if (payments.length === 0) {
      return { items: [] }
    }

    const map: { [date: string]: LedgerBarChartItem } = {}
    const items: LedgerBarChartItem[] = []

    const start = format(payments[0].postedOn, 'YYYY-MM-01')
    const end = format(payments[payments.length - 1].postedOn, 'YYYY-MM-01')

    for (
      let date = start;
      date <= end;
      date = format(addMonths(date, 1), 'YYYY-MM-01')
    ) {
      const item = { date, revenue: 0, spending: 0 }
      map[date] = item
      items.push(item)
    }

    for (const { postedOn, amount } of payments) {
      const date = format(postedOn, 'YYYY-MM-01')
      const item = map[date]

      if (amount < 0) {
        item.spending += -amount
      } else if (amount > 0) {
        item.revenue += amount
      }
    }

    return { items }
  })

export default createLedgerBarChartResolver
