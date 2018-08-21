import { isNil } from 'ramda'
import {
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

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
      where.postedDate_gte = dateMin
    }

    if (!isNil(dateMax)) {
      where.postedDate_lte = dateMax
    }

    if (search) {
      const searchNormalized = normalizeString(search)
      where.OR = [
        {
          peerNameNormalized_contains: searchNormalized,
        },
        {
          peer: {
            nameNormalized_contains: searchNormalized,
          },
        },
        {
          category: {
            nameNormalized_contains: searchNormalized,
          },
        },
        {
          descriptionNormalized_contains: searchNormalized,
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
