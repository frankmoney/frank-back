import debug from 'debug'
import { Prisma } from 'prisma-binding'
import { Prisma as TypedPrisma } from 'app/graphql/generated/prisma'
import normalizeString from 'utils/normalizeString'

const log = debug('migrations:create-peer-categories')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const teams = await prisma.query.teams({}, `{ id, name, nameNormalized }`)
  log(`updating ${teams.length} teams`)
  for (const { id, name, nameNormalized } of teams) {
    if (!nameNormalized || normalizeString(name) !== nameNormalized) {
      log(`updating team #${id}`)
      await prisma.mutation.updateTeam({
        where: { id },
        data: { nameNormalized: normalizeString(name) },
      })
    }
  }

  const users = await prisma.query.users({}, `{ id, email, emailNormalized }`)
  log(`updating ${users.length} users`)
  for (const { id, email, emailNormalized } of users) {
    if (!emailNormalized || normalizeString(email) !== emailNormalized) {
      log(`updating user #${id}`)
      await prisma.mutation.updateUser({
        where: { id },
        data: { emailNormalized: normalizeString(email) },
      })
    }
  }

  const accounts = await prisma.query.accounts(
    {},
    `{ id, name, nameNormalized }`
  )
  log(`updating ${accounts.length} accounts`)
  for (const { id, name, nameNormalized } of accounts) {
    if (!nameNormalized || normalizeString(name) !== nameNormalized) {
      log(`updating account #${id}`)
      await prisma.mutation.updateAccount({
        where: { id },
        data: { nameNormalized: normalizeString(name) },
      })
    }
  }

  const peers = await prisma.query.peers({}, `{ id, name, nameNormalized }`)
  log(`updating ${peers.length} peers`)
  for (const { id, name, nameNormalized } of peers) {
    if (!nameNormalized || normalizeString(name) !== nameNormalized) {
      log(`updating peer #${id}`)
      await prisma.mutation.updatePeer({
        where: { id },
        data: { nameNormalized: normalizeString(name) },
      })
    }
  }

  const categories = await prisma.query.categories(
    {},
    `{ id, name, nameNormalized }`
  )
  log(`updating ${categories.length} categories`)
  for (const { id, name, nameNormalized } of categories) {
    if (!nameNormalized || normalizeString(name) !== nameNormalized) {
      log(`updating category #${id}`)
      await prisma.mutation.updateCategory({
        where: { id },
        data: { nameNormalized: normalizeString(name) },
      })
    }
  }

  const payments = await prisma.query.payments(
    {},
    `{ id, peerName, peerNameNormalized, description, descriptionNormalized }`
  )
  log(`updating ${payments.length} payments`)
  for (const {
    id,
    peerName,
    peerNameNormalized,
    description,
    descriptionNormalized,
  } of payments) {
    if (normalizeString(peerName) !== peerNameNormalized) {
      log(`updating payment #${id} peerName`)
      await prisma.mutation.updatePayment({
        where: { id },
        data: { peerNameNormalized: normalizeString(peerName) },
      })
    }
    if (normalizeString(description) !== descriptionNormalized) {
      log(`updating payment #${id} description`)
      await prisma.mutation.updatePayment({
        where: { id },
        data: { descriptionNormalized: normalizeString(description) },
      })
    }
  }
}
