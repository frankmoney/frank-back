import {
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'ledgerPayments',
  async ({
    assert,
    args: {
      accountId,
      first,
      after,
      skip,
      search,
      dateMin,
      dateMax,
      amountMin,
      amountMax,
      verified,
      categoryId,
    },
    user,
    prisma: { query },
    info,
  }) => {
    await assert.accountAccess(accountId)

    const where: PaymentWhereInput = {
      account: {
        id: accountId,
      },
      postedDate_gte: dateMin,
      postedDate_lte: dateMax,
      amount_gte: amountMin,
      amount_lte: amountMax,
      category: {
        id: categoryId,
      },
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
          category: {
            name_contains: search,
          },
        },
        {
          description_contains: search,
        },
      ]
    }

    const orderBy: PaymentOrderByInput = 'postedDate_DESC'

    const payments = await query.payments(
      {
        where,
        orderBy,
        first,
        after,
        skip,
      },
      info
    )

    return payments
  }
)
