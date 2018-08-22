import addMonths from 'date-fns/add_months'
import format from 'date-fns/format'
import { isNil } from 'ramda'
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
    }

    if (!isNil(categoryId)) {
      where.category = { id: categoryId }
    }

    if (!isNil(amountMin)) {
      where.amount_gte = amountMin
    }

    if (!isNil(amountMax)) {
      where.amount_lte = amountMax
    }

    if (!isNil(dateMin)) {
      where.postedOn_gte = dateMin
    }

    if (!isNil(dateMax)) {
      where.postedOn_lte = dateMax
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
      const item = { date, income: 0, expenses: 0 }
      map[date] = item
      items.push(item)
    }

    for (const { postedOn, amount } of payments) {
      const date = format(postedOn, 'YYYY-MM-01')
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
