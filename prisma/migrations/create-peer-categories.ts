import debug from 'debug'
import { Prisma } from 'prisma-binding'
import { Payment, Prisma as TypedPrisma } from 'app/graphql/generated/prisma'

const log = debug('migrations:create-peer-categories')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const payments = await prisma.query.payments<Payment[]>(
    {},
    `{
    account {
      id
    }
    peerName
    peer {
      id
    }
    category {
      id
    }
  }`
  )

  log(`got ${payments.length} payments`)

  const categoriesByPeer: { [peerId: string]: string[] } = {}

  for (const payment of payments) {
    const accountId = payment.account.id
    if (payment.category && payment.category.id) {
      let peerId = payment.peer && payment.peer.id

      if (!peerId && payment.peerName) {
        log(`searching for peer "${payment.peerName}" in account #${accountId}`)
        const peers = await prisma.query.peers({
          where: { account: { id: accountId }, name: payment.peerName },
        })
        if (peers && peers[0]) {
          peerId = peers[0].id
        } else {
          log(`creating peer "${payment.peerName}" in account #${accountId}`)
          const peer = await prisma.mutation.createPeer(
            {
              data: {
                account: {
                  connect: {
                    id: accountId,
                  },
                },
                name: payment.peerName,
              },
            },
            `{ id }`
          )
          peerId = peer.id
        }
      }

      if (peerId) {
        let list = categoriesByPeer[peerId]

        if (!list) {
          list = []
          categoriesByPeer[peerId] = list
        }

        if (list.indexOf(payment.category.id) < 0) {
          list.push(payment.category.id)
        }
      }
    }
  }

  for (const peerId of Object.keys(categoriesByPeer)) {
    const categoryIds = categoriesByPeer[peerId]

    log(`adding ${categoryIds.length} categories to peer #${peerId}`)
    await prisma.mutation.updatePeer({
      where: { id: peerId },
      data: {
        categories: {
          connect: categoryIds.map(categoryId => ({ id: categoryId })),
        },
      },
    })
  }
}
