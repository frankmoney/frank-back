import { isNil } from 'ramda'
import { Category, PaymentWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type LedgerPieChart = {
  totalIncome: number
  totalExpenses: number
  items: LedgerPieChartItem[]
}

type LedgerPieChartItem = {
  category: {
    id: string
    name: string
    color: string
  } | null
  income: number
  expenses: number
}

export default createPrivateResolver(
  'ledgerPieChart',
  async ({
    assert,
    args: { accountId, precision, dateMin, dateMax },
    user,
    prisma: { query },
  }): Promise<LedgerPieChart> => {
    await assert.accountAccess(accountId)

    const where: PaymentWhereInput = {
      account: { id: accountId },
      amount_not: 0,
    }

    if (!isNil(dateMin)) {
      where.postedOn_gte = dateMin
    }

    if (!isNil(dateMax)) {
      where.postedOn_lte = dateMax
    }

    const payments = await query.payments(
      { where },
      `
      {
        id
        amount
        category {
          id
          name
          color
        }
      }
      `
    )

    let totalIncome = 0
    let totalExpenses = 0
    const categories: { [categoryId: string]: Category | null } = {}
    const items: {
      [categoryId: string]: { income: number; expenses: number }
    } = {}

    for (const { category, amount } of payments) {
      const categoryId = (category && category.id) || ''

      if (!categories[categoryId]) {
        categories[categoryId] = category || null
      }

      let item = items[categoryId]
      if (!item) {
        item = { income: 0, expenses: 0 }
        items[categoryId] = item
      }

      if (amount < 0) {
        item.expenses += -amount
        totalExpenses += -amount
      } else if (amount > 0) {
        item.income += amount
        totalIncome += amount
      }
    }

    return {
      totalIncome,
      totalExpenses,
      items: Object.keys(categories).map(categoryId => ({
        category: categories[categoryId],
        income: items[categoryId].income,
        expenses: items[categoryId].expenses,
      })),
    }
  }
)
