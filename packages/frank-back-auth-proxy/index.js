process.on('uncaughtException', err => {
  // tslint:disable-next-line:no-console
  console.error('Unhandled promise rejection:', err.message, err.stack);
  process.exit(1)
})

process.on('unhandledRejection', err => {
  // tslint:disable-next-line:no-console
  console.error('Unhandled promise rejection:', err.message, err.stack);
  process.exit(1)
})

const cookieParser = require('cookie-parser')
const express = require('express')
const proxy = require('http-proxy-middleware')
const { Pool } = require('pg')

const dbPool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

const PORT = process.env.PORT || 33200
const APOLLO_PORT = process.env.APOLLO_PORT || 33201
const UPLOADER_PORT = process.env.UPLOADER_PORT || 33202


const onProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader('X-Authenticated-User-Id', req.currentUserId)
}

const app = express()

app.get('/', (req, res, next) => {
  if (req.headers['user-agent'].toLowerCase().includes('googlehc')) {
    res.end('Yes! I\'m alive!')
  } else {
    next()
  }
})

app.use(cookieParser())

app.use(async (req, res, next) => {
  try {
    req.currentUserId = ''

    const email =
      req.query.currentUser ||
      req.headers['x-current-user'] ||
      req.cookies.currentUser

    if (email) {

      const dbResponse = await dbPool.query('SELECT * FROM t_user WHERE c_email = $1 LIMIT 1', [email])

      const user = dbResponse.rows[0]

      if (user && user.c_id) {
        req.currentUserId = user.c_id
      }
    }

    next()
  } catch (exc) {
    next(exc)
  }
})

app.use(
  proxy('/upload-image', {
    target: `http://localhost:${UPLOADER_PORT}`,
    pathRewrite: { '^/.+': '/' },
    onProxyReq: onProxyReq,
  }),
)

app.use(
  proxy('/', {
    target: `http://localhost:${APOLLO_PORT}`,
    changeOrigin: true,
    onProxyReq: onProxyReq,
  }),
)

app.listen(PORT, () => console.log(`Auth proxy listening on port http://localhost:${PORT}`))
