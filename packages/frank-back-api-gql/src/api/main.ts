import { ApolloServer } from 'apollo-server-koa'
import Koa, { Context as KoaContext } from 'koa'
import config from 'config'
import createLog from 'log/create'
import RequestContext from './RequestContext'
import Scope from './Scope'
import schema from './schema'

const log = createLog('api:main')

// create apollo server
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
        log.error('Apollo error\r\n%O', error)
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

koaApp.use(async (ctx, next) => {
  const context = <RequestContext>{}
  ctx.state = context

  context.requestId = Math.random()

  log.debug(
    `%s %s | user id: %s #%s`,
    ctx.req.method,
    ctx.req.url,
    ctx.req.headers['x-authenticated-user-id'],
    context.requestId
  )

  const userId = 1
  // const userId = Number(req.headers['x-authenticated-user-id'])

  context.scope = new Scope({
    databaseConfig: config.DATABASE,
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
