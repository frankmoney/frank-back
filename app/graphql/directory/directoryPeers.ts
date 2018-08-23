import {
  DateTime,
  Json,
  Peer,
  PeerOrderByInput,
  PeerWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

type DirectoryPeers = DirectoryPeersPeer[]

type DirectoryPeersPeer = {
  id: string
  name: string
  total: number
  revenue: number
  spendings: number
  lastPaymentDate?: DateTime
  categories: DirectoryPeersCategory[]
  payments: DirectoryPeersPayment[]
  paymentCount: number
}

type DirectoryPeersCategory = {
  id: string
  name: string
  color: string
  count: number
  total: number
  revenue: number
  spendings: number
  payments: DirectoryPeersPayment[]
}

type DirectoryPeersPayment = {
  id: string
  postedOn: DateTime
  amount: number
  description?: string
  rawData: Json
  peer: DirectoryPeersPeer
  category?: DirectoryPeersCategory
}

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
      `{
        id
        name
        total
        revenue
        spendings
        paymentCount
        lastPaymentDate
        categories {
          count
          total
          revenue
          spendings
          category {
            id
            name
            color
          }
        }
        payments {
          id
          postedOn
          amount
          description
          rawData
          category {
            id
          }
        }
      }`
    )

    const $peers: DirectoryPeers = []
    for (const peer of peers) {
      const $peer: DirectoryPeersPeer = {
        id: peer.id,
        name: peer.name,
        total: peer.total,
        revenue: peer.revenue,
        spendings: peer.spendings,
        categories: [],
        payments: [],
        paymentCount: <number>peer.paymentCount,
        lastPaymentDate: peer.lastPaymentDate,
      }

      $peers.push($peer)

      const $categoryMap: { [id: string]: DirectoryPeersCategory } = {}
      for (const category of peer.categories || []) {
        const $category: DirectoryPeersCategory = {
          id: category.category.id,
          name: category.category.name,
          color: category.category.color,
          count: category.count,
          total: category.total,
          revenue: category.revenue,
          spendings: category.spendings,
          payments: [],
        }

        $peer.categories.push($category)
        $categoryMap[$category.id] = $category
      }

      for (const payment of peer.payments || []) {
        const $category = payment.category && $categoryMap[payment.category.id]

        const $payment: DirectoryPeersPayment = {
          id: payment.id,
          postedOn: payment.postedOn,
          amount: payment.amount,
          description: payment.description,
          rawData: payment.rawData,
          peer: $peer,
          category: $category,
        }

        $peer.payments.push($payment)
        if ($category) {
          $category.payments.push($payment)
        }
      }
    }

    return $peers
  }
)
