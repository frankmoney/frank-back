import Koa from 'koa'
import RequestContext from '../RequestContext'
import handleSignUp from './handlers/handleSignUp'

const useHttpApi = (app: Koa, prefix?: string) => {
  prefix = prefix ? `/${prefix.replace(/(^\/+)|(\/+$)/g, '')}` : ''

  return app.use(async (ctx, next) => {
    const context: RequestContext = ctx.state
    const { scope } = context

    try {
      switch (ctx.request.url) {
        case `${prefix}/sign-up`:
        case `${prefix}/sign-up/`:
          await handleSignUp(ctx, next, scope)
        default:
          await next()
      }
    } finally {
      if (ctx.response.status >= 400) {
        await scope.uow.rollback()
      } else {
        await scope.uow.commit()
      }
    }
  })
}

export default useHttpApi
