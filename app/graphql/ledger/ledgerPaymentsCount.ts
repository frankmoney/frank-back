import assertAccountAccess from 'app/assertAccountAccess'
import {
  AggregatePayment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'ledgerPayments',
  async ({
    args: {
      accountId,
      search,
      dateMin,
      dateMax,
      amountMin,
      amountMax,
      verified,
      categoryName,
      categoryColor,
    },
    user,
    prisma: { query },
    info,
  }) => {
    await assertAccountAccess(user.id, accountId, { query })

    const where: PaymentWhereInput = {
      account: {
        id: accountId,
      },
      postedDate_gte: dateMin,
      postedDate_lte: dateMax,
      amount_gte: amountMin,
      amount_lte: amountMax,
    }

    if (categoryName) {
      where.categoryName = categoryName
    }

    if (categoryColor) {
      where.categoryColor = categoryColor
    }

    if (search) {
      where.OR = [
        {
          peerName_contains: search,
        },
        {
          peer: {
            name_contains: search,
          },
        },
        {
          categoryName_contains: search,
        },
        {
          description_contains: search,
        },
      ]
    }

    const {
      aggregate: { count },
    } = await query.paymentsConnection(
      {
        where,
      },
      `{ aggregate { count } }`
    )

    return { count }
  }
)
