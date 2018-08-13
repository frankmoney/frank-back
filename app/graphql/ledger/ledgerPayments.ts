import assertAccountAccess from 'app/assertAccountAccess'
import {
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'ledgerPayments',
  async ({
    args: {
      accountId,
      first,
      after,
      search,
      dateMin,
      dateMax,
      amountMin,
      amountMax,
      verified,
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

    const orderBy: PaymentOrderByInput = 'postedDate_DESC'

    const payments = await query.payments(
      {
        where,
        orderBy,
        first,
        after,
      },
      info
    )

    return payments
  }
)