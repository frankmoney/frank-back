import { Prisma } from 'prisma-binding'
import handleAccount from './handleAccount'

const prisma = new Prisma({
  typeDefs: 'app/graphql/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
})

const main = async () => {

  const accounts = await prisma.query.accounts()

  for (const account of accounts) {

    await handleAccount(account, prisma, 60)

  }
}

main()
