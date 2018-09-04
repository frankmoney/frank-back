import { PeerConnection, PeerWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createCountPeersResolver = <TArgs = any>(
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

    const connection = await query.peersConnection<PeerConnection>(
      {
        where,
      },
      `{ aggregate { count } }`
    )

    const value = connection.aggregate.count

    return { value }
  })

export default createCountPeersResolver
