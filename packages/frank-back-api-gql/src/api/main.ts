import { init as initSentry } from '@sentry/node'
import { ApolloServer } from 'apollo-server-koa'
import Koa, { Context as KoaContext } from 'koa'
import * as R from 'ramda'
import config from 'config'
import createLog from 'log/create'
import { sql } from 'sql'
import { SystemUserId, SystemUserName, UserType } from 'store/enums'
import { user } from 'store/names'
import RequestContext from './RequestContext'
import Scope from './Scope'
import useHttpApi from './http/useHttpApi'
import schema from './schema'

if (config.SENTRY_DSN) {
  initSentry({ dsn: config.SENTRY_DSN })
}

const log = createLog('api:main')

const scope = new Scope({
  config,
  user: null,
})

const promise = scope.uow.start().then(async () => {
  const systemUserIds = await scope.db.query<{ id: number; name: string }>(
    sql`
        select "${user.id}" "id", "${user.name}" "name"
        from "${user}"
        where "${user.typeId}" = ${UserType.system}
      `
  )

  const findSystemUserId = (name: string) =>
    R.find(x => x.name === name, systemUserIds)!.id

  SystemUserId.migration = findSystemUserId(SystemUserName.migration)
  SystemUserId.system = findSystemUserId(SystemUserName.system)
  SystemUserId.import = findSystemUserId(SystemUserName.import)
  SystemUserId.suggestion = findSystemUserId(SystemUserName.suggestion)

  await scope.uow.commit()
  await scope.uow.dispose()

  const apolloServer = new ApolloServer({
    schema,
    context({ ctx: { state } }: { ctx: KoaContext }) {
      return state
    },
    async formatResponse(
      body: { errors?: any[] },
      { context }: { context: RequestContext }
    ) {
      if (body && body.errors && body.errors.length > 0) {
        try {
          await context.scope.uow.rollback()
        } catch (exc) {
          log.error('Failed to roll back\r\n%O', exc)
        }

        for (const error of body.errors) {
          log.error(error, 'Apollo error', error)
        }
      } else {
        try {
          await context.scope.uow.commit()
        } catch (exc) {
          log.error('Failed to commit\r\n%O', exc)
          throw exc
        }
      }
      return body
    },
  })

  // create koa application
  const koaApp = new Koa()

  koaApp.use(async ({ request: { url }, response }, next) => {
    if (url === '/.well-known/apollo/server-health') {
      response.type = 'application/health+json'
      response.body = { status: 'pass' }
    } else {
      await next()
    }
  })

  koaApp.use(async (ctx, next) => {
    const context = <RequestContext>{}
    ctx.state = context

    context.requestId = Math.random()
    
    // CORS
    context.set('Access-Control-Allow-Origin', '*')
    
    log.debug(
      `%s %s | user id: %s #%s`,
      ctx.req.method,
      ctx.req.url,
      ctx.req.headers['x-authenticated-user-id'],
      context.requestId
    )

    // const userId = 3
    const userId = Number(ctx.headers['x-authenticated-user-id'])

    context.scope = new Scope({
      config,
      user: userId ? { id: userId } : null,
    })

    await context.scope.uow.start()

    try {
      await next()
    } catch (exc) {
      log.error(
        `[ERR] %s %s | user id: %s #%s\r\n%O`,
        ctx.req.method,
        ctx.req.url,
        ctx.req.headers['x-authenticated-user-id'],
        context.requestId,
        exc
      )

      throw exc
    } finally {
      await context.scope.uow.dispose()

      log.trace(
        `[END] %s %s | user id: %s #%s`,
        ctx.req.method,
        ctx.req.url,
        ctx.req.headers['x-authenticated-user-id'],
        context.requestId
      )
    }
  })

  useHttpApi(koaApp, '/http/')

  apolloServer.applyMiddleware({
    app: <any>koaApp, // cast to any as apollo-server-koa typings are broken
    path: '/',
    // bodyParserConfig: { limit: '50mb' },
    cors: {
      origin: '*',
    },
  })

  koaApp.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(
      `🚀 Apollo server ready at http://localhost:${process.env.PORT}${
        apolloServer.graphqlPath
      }`
    )
  })
})

promise.then(null, err => {
  log.error('Failed to prepare app\r\n%O', err)
  process.exit(1)
})
