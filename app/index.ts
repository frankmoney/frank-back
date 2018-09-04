import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'
import { resolvers, typeDefs } from 'app/graphql'

// const schema = makeExecutableSchema({ typeDefs, resolvers })
import schema from './graphql/schema'

const server = new ApolloServer({
  schema,
  context({ req }: any) {
    return {
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
