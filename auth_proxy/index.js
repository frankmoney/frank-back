import { Prisma } from 'prisma-binding'
import express from 'express'
import cookieParser from 'cookie-parser'
import proxy from 'http-proxy-middleware'

const PORT = process.env.PORT || 33200
const APOLLO_PORT = process.env.APOLLO_PORT || 33201
const PRISMA_ENDPOINT = process.env.PRISMA_ENDPOINT || 'http://prisma.frank-dev1.frank.ly'

const app = express()

app.use(cookieParser())

app.use(async (req, res, next) => {
  try {
    req.currentUserId = ''

    const email =
      req.query.currentUser ||
      req.headers['x-current-user'] ||
      req.cookies.currentUser

    if (email) {
      const prisma = (
        new Prisma({
          typeDefs: '../app/graphql/generated/prisma.graphql',
          endpoint: PRISMA_ENDPOINT,
        }))

      const user = await prisma.query.user({ where: { email } }, `{id}`)

      if (user && user.id) {
        req.currentUserId = user.id
      }
    }

    next()
  } catch (exc) {
    next(exc)
  }
})


app.use(proxy('/', {
  target: `http://localhost:${APOLLO_PORT}`,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Authenticated-User-Id', req.currentUserId)
  },
}))


app.listen(PORT, () => console.log(`Auth proxy listening on port ${PORT}`))
