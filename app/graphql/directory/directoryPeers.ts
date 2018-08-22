import {
  Peer,
  PeerOrderByInput,
  PeerWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type DirectoryPeers = Peer[]

export default createPrivateResolver(
  'directoryPeers',
  async ({
    assert,
    args: { accountId, sortBy, donors, recipients, search, first, skip },
    prisma: { query },
    info,
  }): Promise<DirectoryPeers> => {
    await assert.accountAccess(accountId)

    const where: PeerWhereInput = {
      account: { id: accountId },
    }

    if (donors) {
      if (!recipients) {
        where.total_gt = 0
      }
    } else if (recipients) {
      where.total_lt = 0
    } else {
      return []
    }

    if (search) {
      where.OR = [
        {
          nameNormalized_contains: search,
        },
        {
          categories_some: {
            category: {
              nameNormalized_contains: search,
            },
          },
        },
      ]
    }

    let orderBy: PeerOrderByInput
    switch (sortBy) {
      default:
      case 'name':
        orderBy = 'name_ASC'
        break
      case 'date':
        orderBy = 'lastPaymentDate_DESC'
        break
      case 'total':
        orderBy = 'total_DESC'
        break
      case 'revenue':
        orderBy = 'revenue_DESC'
        break
      case 'spendings':
        orderBy = 'spendings_DESC'
        break
    }

    const peers = await query.peers<Peer[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      info
    )

    return peers
  }
)
