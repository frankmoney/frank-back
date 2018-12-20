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
const jwt = require('jsonwebtoken')
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

if (!process.env.AUTHENTICATION_JWT_KEY) {
  throw new Error('Invalid configuration: AUTHENTICATION_JWT_KEY should be set')
}

if (!process.env.AUTHENTICATION_COOKIE) {
  throw new Error('Invalid configuration: AUTHENTICATION_COOKIE should be set')
}

if (
  !process.env.AUTHENTICATION_COOKIE_TTL_MS ||
  !Number(process.env.AUTHENTICATION_COOKIE_TTL_MS) ||
  Number(process.env.AUTHENTICATION_COOKIE_TTL_MS) <= 0
) {
  throw new Error(`Invalid configuration: AUTHENTICATION_COOKIE_TTL should be set and be a positive number`)
}

const authenticationDisabled =
  process.env.AUTHENTICATION_DISABLED &&
  ['1', 't', 'true'].indexOf(process.env.AUTHENTICATION_DISABLED.toLowerCase()) >= 0 || false
const authenticationJwtKey = process.env.AUTHENTICATION_JWT_KEY
const authenticationCookie = process.env.AUTHENTICATION_COOKIE
const authenticationCookieTtlMs = Number(process.env.AUTHENTICATION_COOKIE_TTL_MS)

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
    const claims = req.cookies[authenticationCookie]
      ? await new Promise(
        (resolve, reject) => jwt.verify(
          req.cookies[authenticationCookie],
          authenticationJwtKey,
          (err, result) => err
            ? (
              err.name === 'JsonWebTokenError' && err.message === 'invalid token'
                ? resolve(null)
                : reject(err)
            )
            : resolve(result)
        )
      )
      : null

    // renew auth cookie if valid
    if (claims) {
      res.cookie(
        authenticationCookie,
        req.cookies[authenticationCookie],
        {
          path: '/',
          httpOnly: true,
          maxAge: authenticationCookieTtlMs,
        }
      )
    }

    req.currentUserId = claims ? `${claims.userId}` : ''

    if (authenticationDisabled) {
      const email =
        req.query.currentUser ||
        req.headers['x-current-user']

      if (email) {
        const dbResponse = await dbPool.query(
          'SELECT c_id FROM t_user WHERE c_type_id = $1 AND c_name = $2 LIMIT 1',
          [2, email.toLowerCase()]
        )

        const user = dbResponse.rows[0]

        if (user && user.c_id) {
          req.currentUserId = user.c_id
        }
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
    onProxyRes: (proxyRes, req, res) => {
      switch (req.url) {
        case '/http/sign-in':
        case '/http/sign-in/':
          const userId = proxyRes.headers['x-authenticated-user-id']
          if (userId) {
            const token = jwt.sign({ userId }, authenticationJwtKey)
            res.cookie(
              authenticationCookie,
              token,
              {
                path: '/',
                httpOnly: true,
                maxAge: authenticationCookieTtlMs,
              }
            )
            res.send({ code: 'signed_in' })
            res.end()
          }
          break
      }
    },
  }),
)

// tslint:disable-next-line:no-console
app.listen(PORT, () => console.log(`Auth proxy listening on port http://localhost:${PORT}`))
