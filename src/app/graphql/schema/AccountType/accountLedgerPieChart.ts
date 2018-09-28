import { isNil } from 'ramda'
import { Category, PaymentWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

const accountLedgerPieChart = createPrivateResolver(
  'Account:ledgerPieChart',
  async ({ parent, args, prisma: { query } }) => {
    const where: PaymentWhereInput = {
      account: { id: parent.id },
      amount_not: 0,
    }

    if (!isNil(args.postedOnMin)) {
      where.postedOn_gte = args.postedOnMin
    }

    if (!isNil(args.postedOnMax)) {
      where.postedOn_lte = args.postedOnMax
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

    let totalRevenue = 0
    let totalSpending = 0
    const categories: { [categoryId: string]: Category | null } = {}
    const items: {
      [categoryId: string]: { revenue: number; spending: number }
    } = {}

    for (const { category, amount } of payments) {
      const categoryId = (category && category.id) || ''

      if (!categories[categoryId]) {
        categories[categoryId] = category || null
      }

      let item = items[categoryId]
      if (!item) {
        item = { revenue: 0, spending: 0 }
        items[categoryId] = item
      }

      if (amount < 0) {
        item.spending += -amount
        totalSpending += -amount
      } else if (amount > 0) {
        item.revenue += amount
        totalRevenue += amount
      }
    }

    return {
      totalRevenue,
      totalSpending,
      items: Object.keys(categories).map(categoryId => ({
        category: categories[categoryId],
        revenue: items[categoryId].revenue,
        spending: items[categoryId].spending,
      })),
    }
  }
)

export default accountLedgerPieChart
