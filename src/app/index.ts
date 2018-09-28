import { ApolloServer } from 'apollo-server'
import { Prisma } from 'prisma-binding'
import createLogger from 'utils/createLogger'
import schema from './graphql/schema'
import Scope from './Scope'
import User from './User'

const log = createLogger('app:server')

const server = new ApolloServer({
  schema,
  context({ req }: any) {
    log.trace('user id:', req.headers['x-authenticated-user-id'])

    const databaseConfig = JSON.parse(<string>process.env.DATABASE)

    const userId = Number(req.headers['x-authenticated-user-id'])
    const user: null | User = userId ? { id: userId } : null

    const scope = new Scope({
      databaseConfig,
      user,
    })

    return {
      scope,
      // user: { id: 'cjkhv9pqg0hhf0a168cnsreq6' },
      user: { id: req.headers['x-authenticated-user-id'] },
      prisma: new Prisma({
        typeDefs: 'app/graphql/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
      }),
    }
  },
})

server.listen(process.env.PORT).then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Apollo server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  )
})
