import { isNil } from 'ramda'
import {
  PaymentConnection,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

export default createPrivateResolver(
  'Account:countPayments',
  async ({ parent, args, prisma: { query } }) => {
    const accountId = parent.id

    const where: PaymentWhereInput = {
      account: {
        id: accountId,
      },
    }

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

    if (args.search) {
      const searchNormalized = normalizeString(args.search)
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

    const result = await query.paymentsConnection<PaymentConnection>(
      { where },
      `{ aggregate { count } }`
    )

    const value = result.aggregate.count

    return { value }
  }
)
