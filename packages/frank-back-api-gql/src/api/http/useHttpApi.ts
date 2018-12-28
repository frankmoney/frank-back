import { URL } from 'url'
import Koa from 'koa'
import startsWith from 'utils/startsWith'
import RequestContext from '../RequestContext'
import handleHook from './handlers/handleHook'
import handleRecoverPassword from './handlers/handleRecoverPassword'
import handleResetPassword from './handlers/handleResetPassword'
import handleSignIn from './handlers/handleSignIn'
import handleSignUp from './handlers/handleSignUp'

const useHttpApi = (app: Koa, prefix?: string) => {
  prefix = prefix ? `/${prefix.replace(/(^\/+)|(\/+$)/g, '')}` : ''

  return app.use(async (ctx, next) => {
    const context: RequestContext = ctx.state
    const { scope } = context

    const log = scope.logFor('http')

    try {
      const url = new URL(ctx.request.url, 'http://0.0.0.0')

      switch (true) {
        case startsWith(url.pathname, `${prefix}/hooks/`):
          await handleHook(ctx, next, {
            scope,
            url,
            subPath: url.pathname.substr(`${prefix}/hooks/`.length),
          })
          break

        case url.pathname === `${prefix}/recover-password`:
        case url.pathname === `${prefix}/recover-password/`:
          await handleRecoverPassword(ctx, next, scope)
          break

        case url.pathname === `${prefix}/reset-password`:
        case url.pathname === `${prefix}/reset-password/`:
          await handleResetPassword(ctx, next, scope)
          break

        case url.pathname === `${prefix}/sign-in`:
        case url.pathname === `${prefix}/sign-in/`:
          await handleSignIn(ctx, next, scope)
          break

        case url.pathname === `${prefix}/sign-up`:
        case url.pathname === `${prefix}/sign-up/`:
          await handleSignUp(ctx, next, scope)
          break

        default:
          await next()
          break
      }
    } catch (exc) {
      log.error(exc)
      throw exc
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
