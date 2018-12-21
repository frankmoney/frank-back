import Koa from 'koa'
import RequestContext from '../RequestContext'
import handleSignIn from './handlers/handleSignIn'
import handleSignUp from './handlers/handleSignUp'

const useHttpApi = (app: Koa, prefix?: string) => {
  prefix = prefix ? `/${prefix.replace(/(^\/+)|(\/+$)/g, '')}` : ''

  return app.use(async (ctx, next) => {
    const context: RequestContext = ctx.state
    const { scope } = context

    try {
      switch (ctx.request.url) {
        case `${prefix}/sign-in`:
        case `${prefix}/sign-in/`:
          await handleSignIn(ctx, next, scope)
          break
        case `${prefix}/sign-up`:
        case `${prefix}/sign-up/`:
          await handleSignUp(ctx, next, scope)
          break
        default:
          await next()
          break
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
