import addMonths from 'date-fns/add_months'
import format from 'date-fns/format'
import {
  Payment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type LedgerBarChart = {
  items: LedgerBarChartItem[]
}

type LedgerBarChartItem = {
  date: string
  income: number
  expenses: number
}

export default createPrivateResolver(
  'ledgerBarChart',
  async ({
    assert,
    args: {
      accountId,
      categoryId,
      amountMin,
      amountMax,
      dateMin,
      dateMax,
      verified,
    },
    prisma: { query },
  }): Promise<LedgerBarChart> => {
    await assert.accountAccess(accountId)

    const where: PaymentWhereInput = {
      account: { id: accountId },
      category: { id: categoryId },
      amount_gte: amountMin,
      amount_lte: amountMax,
      postedDate_gte: dateMin,
      postedDate_lte: dateMax,
    }

    const orderBy: PaymentOrderByInput = 'postedDate_ASC'

    const payments = await query.payments<Payment[]>(
      { where, orderBy },
      `{
      postedDate
      amount
    }`
    )

    if (payments.length === 0) {
      return { items: [] }
    }

    const map: { [date: string]: LedgerBarChartItem } = {}
    const items: LedgerBarChartItem[] = []

    const start = format(payments[0].postedDate, 'YYYY-MM-01')
    const end = format(payments[payments.length - 1].postedDate, 'YYYY-MM-01')

    for (
      let date = start;
      date <= end;
      date = format(addMonths(date, 1), 'YYYY-MM-01')
    ) {
      const item = { date, income: 0, expenses: 0 }
      map[date] = item
      items.push(item)
    }

    for (const { postedDate, amount } of payments) {
      const date = format(postedDate, 'YYYY-MM-01')
      const item = map[date]

      if (amount < 0) {
        item.expenses += -amount
      } else if (amount > 0) {
        item.income += amount
      }
    }

    return { items }
  }
)
