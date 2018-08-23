import { PeerWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

type DirectoryPeersCount = {
  count: number
}

export default createPrivateResolver(
  'directoryPeersCount',
  async ({
    assert,
    args: { accountId, donors, recipients, search },
    prisma: { query },
  }): Promise<DirectoryPeersCount> => {
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
      return { count: 0 }
    }

    if (search) {
      const searchNormalized = normalizeString(search)
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

    const {
      aggregate: { count },
    } = await query.peersConnection({ where }, `{ aggregate: { count } }`)

    return { count }
  }
)
