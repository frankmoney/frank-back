import {
  Peer,
  PeerOrderByInput,
  PeerWhereInput,
} from 'app/graphql/generated/prisma'
import PeersOrder from 'app/graphql/schema/PeersOrder'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createPeersResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => PeerWhereInput | Promise<PeerWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      args,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    if (args.donors) {
      if (!args.recipients) {
        where.total_gt = 0
      }
    } else if (args.recipients) {
      where.total_lt = 0
    } else {
      return []
    }

    if (args.search) {
      const searchNormalized = normalizeString(args.search)
      where.OR = [
        {
          nameNormalized_contains: searchNormalized,
        },
        {
          categories_some: {
            category: {
              nameNormalized_contains: searchNormalized,
            },
          },
        },
      ]
    }

    let orderBy: PeerOrderByInput
    switch (args.sortBy) {
      default:
      case PeersOrder.values.name:
        orderBy = 'name_ASC'
        break
      case PeersOrder.values.lastPaymentDate:
        orderBy = 'lastPaymentDate_DESC'
        break
      case PeersOrder.values.total:
        orderBy = 'total_DESC'
        break
      case PeersOrder.values.revenue:
        orderBy = 'revenue_DESC'
        break
      case PeersOrder.values.spending:
        orderBy = 'spendings_DESC'
        break
    }

    const first = args.first

    const skip = args.skip

    const peers = await query.peers<Peer[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      `{ id, name, lastPaymentDate }`
    )

    return peers
  })

export default createPeersResolver
