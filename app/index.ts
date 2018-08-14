import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'
import { Prisma as PrismaType } from 'app/graphql/generated/prisma'
import { resolvers, typeDefs } from 'app/graphql'
import cookieParser from 'cookie-parser'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

const prisma = <PrismaType><any>new Prisma({
  typeDefs: 'app/graphql/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
})

app.use(cookieParser())

app.use((req: any, res, next) => {

  prisma.query
    .user({ where: { email: req.query.currentUser || req.cookies.currentUser || '' } }, '{id}')
    .then((result) => {

      if (result) {
        req.headers['x-authenticated-user-id'] = result.id
        next()
      }
      else {
        res.status(401).set('Content-Type', 'text/plain').end('Unauthorized. Set currentUser')
      }
    }, next)
})

const server = new ApolloServer({
  schema,
  context({ req }: any) {
    return {
      user: { id: req.headers['x-authenticated-user-id'] },
      prisma,
    }
  },
})

server.applyMiddleware({ app }) // app is from an existing express app

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`),
)
