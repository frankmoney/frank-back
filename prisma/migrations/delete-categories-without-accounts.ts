import debug from 'debug'
import { Prisma } from 'prisma-binding'
import {
  Payment,
  Peer,
  Prisma as TypedPrisma,
} from 'app/graphql/generated/prisma'

const log = debug('migrations:delete-categories-without-accounts')

export const up = async () => {
  log('starting up')

  const prisma = <TypedPrisma>(<any>new Prisma({
    typeDefs: 'app/graphql/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  }))

  const categories = await prisma.query.categories({}, `{ id, account { id } }`)
  log(`got ${categories.length} categories`)

  const ids = categories.filter(x => !x.account || !x.account.id).map(x => x.id)
  log(`deleting ${ids.length} categories`)
  await prisma.mutation.deleteManyCategories({ where: { id_in: ids } })
}
