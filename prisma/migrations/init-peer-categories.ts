import debug from 'debug'
import { Prisma } from 'prisma-binding'
import { Prisma as TypedPrisma } from 'app/graphql/generated/prisma'

const log = debug('migrations:init-peer-categories')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const peers = await prisma.query.peers(
    {},
    `{ id, payments { amount, category { id } }, oldCategories { id } }`
  )
  log(`updating ${peers.length} peers`)
  for (const { id: peerId, payments, oldCategories } of peers) {
    if (oldCategories) {
      for (const { id: categoryId } of oldCategories) {
        log(
          `creating PeerCategory for peer #${peerId} and category #${categoryId}`
        )

        let paymentCount = 0
        let paymentAmount = 0
        let paymentRevenue = 0
        let paymentSpendings = 0

        if (payments) {
          for (const { amount, category } of payments) {
            if (category && category.id === categoryId) {
              ++paymentCount
              paymentAmount += amount
              if (amount < 0) {
                paymentSpendings += -amount
              } else {
                paymentRevenue += amount
              }
            }
          }
        }

        await prisma.mutation.createPeerCategory({
          data: {
            peer: {
              connect: {
                id: peerId,
              },
            },
            category: {
              connect: {
                id: categoryId,
              },
            },
            paymentCount,
            paymentAmount,
            paymentRevenue,
            paymentSpendings,
          },
        })
      }
    }
  }
}
