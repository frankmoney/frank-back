const { ApolloServer, gql } = require('apollo-server')
const { Prisma } = require('prisma-binding')
const schema = require('./graphql/schema.js')

const PRISMA_ENDPOINT = 'http://prisma.frank-dev1.frank.ly'
const PORT = 33201

const server = new ApolloServer({
  schema,
  context({ req }) {
    return {
      user: { id: req.headers['x-authenticated-user-id'] },
      prisma: new Prisma({
        typeDefs: 'graphql/generated/prisma.graphql',
        endpoint: PRISMA_ENDPOINT,
      }),
    }
  },
})


server.listen(PORT).then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Apollo server ready at http://localhost:${PORT}${
      server.graphqlPath
      }`,
  )
})
