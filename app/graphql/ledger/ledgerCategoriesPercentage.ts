import {
  Category,
  Payment,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type LedgerCategoriesPercentage = {
  items: LedgerCategoriesPercentageItem[]
}

type LedgerCategoriesPercentageItem = {
  category: {
    id: string
    name: string
    color: string
  }
  incomePercentage: number
  expensesPercentage: number
}

const createItems = (precision: number, payments: Payment[]) => {
  const coeff = Math.pow(10, precision)
  const round = (value: number) => Math.round(value * coeff) / coeff

  let totalIncome = 0
  let totalExpenses = 0

  const categories: { [key: string]: Category } = {}
  const items: { [key: string]: { income: number; expenses: number } } = {}

  payments.forEach(({ category, amount }) => {
    if (amount !== 0) {
      const categoryId = category ? category.id : ''

      if (category && !categories[categoryId]) {
        categories[categoryId] = category
      }

      let item = items[categoryId]

      if (!item) {
        item = { income: 0, expenses: 0 }
        items[categoryId] = item
      }

      if (amount < 0) {
        item.expenses -= amount
        totalExpenses -= amount
      } else {
        item.income += amount
        totalIncome += amount
      }
    }
  })

  let incomePercentageRemains = 100
  let expensesPercentageRemains = 100

  const result: LedgerCategoriesPercentageItem[] = Object.keys(items)
    .map(categoryId => {
      const item = items[categoryId]
      const category = categories[categoryId] || null

      const incomeFraction = totalIncome ? item.income / totalIncome : 0
      const expensesFraction = totalExpenses ? item.expenses / totalExpenses : 0

      const incomePercentage = round(incomeFraction * 100)
      const expensesPercentage = round(expensesFraction * 100)

      incomePercentageRemains -= incomePercentage
      expensesPercentageRemains -= expensesPercentage

      return { category, incomePercentage, expensesPercentage }
    })
    .filter(
      ({ incomePercentage, expensesPercentage }) =>
        incomePercentage || expensesPercentage
    )

  const step = Math.pow(10, -precision)

  result.sort((a, b) => b.incomePercentage - a.incomePercentage)
  while (incomePercentageRemains > 0) {
    for (const item of result) {
      incomePercentageRemains -= step
      item.incomePercentage += step
      if (incomePercentageRemains <= 0) {
        break
      }
    }
  }

  result.sort((a, b) => b.expensesPercentage - a.expensesPercentage)
  while (expensesPercentageRemains > 0) {
    for (const item of result) {
      expensesPercentageRemains -= step
      item.expensesPercentage += step
      if (expensesPercentageRemains <= 0) {
        break
      }
    }
  }

  if (100 !== result.reduce((a, b) => a + b.incomePercentage, 0)) {
    throw new Error('sum(incomePercentage) != 100')
  }

  if (100 !== result.reduce((a, b) => a + b.expensesPercentage, 0)) {
    throw new Error(
      [
        'sum(expensesPercentage) != 100',
        result.reduce((a, b) => a + b.expensesPercentage, 0),
        ...result.map(x => x.expensesPercentage),
      ].join('\n')
    )
  }

  return result
}

export default createPrivateResolver(
  'ledgerCategoriesPercentage',
  async ({
    assert,
    args: { accountId, precision, dateMin, dateMax },
    user,
    prisma: { query },
  }): Promise<LedgerCategoriesPercentage> => {
    await assert.accountAccess(accountId)

    const where: PaymentWhereInput = {
      account: {
        id: accountId,
      },
      amount_not: 0,
      postedDate_gte: dateMin,
      postedDate_lte: dateMax,
    }

    const payments = await query.payments(
      { where },
      `{
      id
      amount
      category {
        id
        name
        color
      }
    }`
    )

    const items = createItems(precision, payments)

    return { items }
  }
)
