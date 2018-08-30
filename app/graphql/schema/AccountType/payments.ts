import { isNil } from 'ramda'
import {
  Payment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

export default createPrivateResolver(
  'Account:payments',
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

    const orderBy: PaymentOrderByInput = 'postedOn_DESC'

    const first = args.first

    const skip = args.skip

    const payments = await query.payments<Payment[]>({
      where,
      orderBy,
      first,
      skip,
    })

    return payments
  }
)
