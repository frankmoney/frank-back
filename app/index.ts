import { ApolloServer, defaultPlaygroundOptions } from 'apollo-server'
import debug from 'debug'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'
import { resolvers, typeDefs } from 'app/graphql'

const log = debug('app')

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  context() {
    return {
      user: {
        id: 'cjkhv9pqg0hhf0a168cnsreq6',
        email: 'gabriel@frank.ly',
      },
      prisma: new Prisma({
        typeDefs: 'app/graphql/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
      }),
    }
  },
  playground: {
    settings: {
      ...defaultPlaygroundOptions.settings,
      ['request.credentials']: 'include',
    },
  },
})

server.listen(process.env.PORT).then(({ url }) => {
  log(`Listening at ${url}`)
})
