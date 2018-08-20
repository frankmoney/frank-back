import debug from 'debug'
import { Prisma } from 'prisma-binding'
import {
  Payment,
  Peer,
  Prisma as TypedPrisma,
} from 'app/graphql/generated/prisma'

const log = debug('migrations:set-peer-categories-from-payments')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const peers = await prisma.query.peers<Peer[]>(
    {},
    `{ id, categories { id } }`
  )
  log(`got ${peers.length} peers`)

  for (const peer of peers) {
    if (peer.categories && peer.categories.length > 0) {
      log(`clearing peer #${peer.id} categories`)
      await prisma.mutation.updatePeer({
        where: { id: peer.id },
        data: {
          categories: { disconnect: peer.categories.map(x => ({ id: x.id })) },
        },
      })
    }
  }

  const payments = await prisma.query.payments<Payment[]>(
    {},
    `{ peer { id }, category { id } }`
  )
  log(`got ${payments.length} payments`)

  const map: { [peerId: string]: Set<string> } = {}

  for (const payment of payments) {
    if (
      payment.peer &&
      payment.peer.id &&
      payment.category &&
      payment.category.id
    ) {
      let set = map[payment.peer.id]

      if (!set) {
        set = new Set<string>()
        map[payment.peer.id] = set
      }

      set.add(payment.category.id)
    }
  }

  for (const peerId of Object.keys(map)) {
    const categoryIds = Array.from(map[peerId])
    log(`connecting peer #${peerId} to ${categoryIds.length} categories`)
    await prisma.mutation.updatePeer({
      where: { id: peerId },
      data: { categories: { connect: categoryIds.map(id => ({ id })) } },
    })
  }
}
