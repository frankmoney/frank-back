import debug from 'debug'
import { Prisma } from 'prisma-binding'
import { Peer, Prisma as TypedPrisma } from 'app/graphql/generated/prisma'

const log = debug('migrations:set-peer-payment-count')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const peers = await prisma.query.peers<Peer[]>({}, `{ id }`)

  for (const { id: peerId } of peers) {
    log(`counting payments of peer #${peerId}`)

    const {
      aggregate: { count },
    } = await prisma.query.paymentsConnection(
      { where: { peer: { id: peerId } } },
      `{ aggregate { count } }`
    )

    log(`setting peer.paymentCount of peer #${peerId} to ${count}`)

    await prisma.mutation.updatePeer({
      where: { id: peerId },
      data: { paymentCount: count },
    })
  }
}
