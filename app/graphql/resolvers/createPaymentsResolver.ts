import { isNil } from 'ramda'
import {
  Payment,
  PaymentOrderByInput,
  PaymentWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createPaymentsResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => PaymentWhereInput | Promise<PaymentWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      args,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

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

    const payments = await query.payments<Payment[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      `{ id, postedOn, peerName, description, rawData }`
    )

    return payments
  })

export default createPaymentsResolver
