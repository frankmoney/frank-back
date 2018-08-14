import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from 'prisma-binding'
import { Prisma as PrismaType } from 'app/graphql/generated/prisma'
import { resolvers, typeDefs } from 'app/graphql'
import cookieParser from 'cookie-parser'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

app.use(cookieParser())

app.use(async (req, res, next) => {
  try {
    req.headers['x-authenticated-user-id'] = ''

    const email =
      req.query.currentUser ||
      req.headers['x-current-user'] ||
      req.cookies.currentUser

    if (email) {
      const prisma = <PrismaType>(<any>new Prisma({
        typeDefs: 'app/graphql/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
      }))

      const user = await prisma.query.user({ where: { email } }, `{ id }`)

      if (user && user.id) {
        req.headers['x-authenticated-user-id'] = user.id
      }
    }

    next()
  } catch (exc) {
    next(exc)
  }
})

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

server.applyMiddleware({ app }) // app is from an existing express app

app.listen({ port: process.env.PORT }, () =>
  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  )
)
