import isBefore from 'date-fns/is_before'
import debug from 'debug'
import { Prisma } from 'prisma-binding'
import {
  DateTime,
  Payment,
  Prisma as TypedPrisma,
} from 'app/graphql/generated/prisma'

const log = debug('migrations:normalize-peers')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const payments = await prisma.query.payments<Payment[]>(
    {},
    `{
    id
    peer {
      id
    }
    peerName
    amount
    date
  }`
  )

  log(`got ${payments.filter(x => x.peer).length} payments`)

  const peers: {
    [peerId: string]: {
      lastPaymentDate?: DateTime
      total: number
      revenue: number
      spendings: number
    }
  } = {}

  for (const payment of payments) {
    let peerId = payment.peer && payment.peer.id

    if (!peerId && payment.peerName) {
      log(`searching for peer "${payment.peerName}"`)
      const r = await prisma.query.peers({ where: { name: payment.peerName } })
      if (r && r[0]) {
        log(`setting peer.id to #${r[0].id} of payment #${payment.id}`)
        await prisma.mutation.updatePayment({
          where: { id: payment.id },
          data: { peer: { connect: { id: r[0].id } } },
        })
        peerId = r[0].id
      }
    }

    if (peerId) {
      let peer = peers[peerId]

      if (!peer) {
        peer = { total: 0, revenue: 0, spendings: 0 }
        peers[peerId] = peer
      }

      if (payment.amount < 0) {
        peer.spendings += -payment.amount
      } else if (payment.amount > 0) {
        peer.revenue += payment.amount
      }
      peer.total += payment.amount
      if (
        !peer.lastPaymentDate ||
        isBefore(payment.postedOn, peer.lastPaymentDate)
      ) {
        peer.lastPaymentDate = payment.postedOn
      }
    }
  }

  for (const peerId of Object.keys(peers)) {
    log(`updating peer #${peerId}`)

    const { total, revenue, spendings, lastPaymentDate } = peers[peerId]

    await prisma.mutation.updatePeer({
      where: { id: peerId },
      data: {
        total,
        revenue,
        spendings,
        lastPaymentDate,
      },
    })
  }
}
