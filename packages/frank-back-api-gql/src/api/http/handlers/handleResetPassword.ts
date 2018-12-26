import { Context } from 'koa'
import Scope from 'api/Scope'
import handleResetPasswordGet from './handleResetPasswordGet'
import handleResetPasswordPost from './handleResetPasswordPost'

const handleResetPassword = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('handleResetPassword')

  try {
    if (ctx.req.method === 'GET') {
      await handleResetPasswordGet(ctx, next, scope)
    } else if (ctx.req.method === 'POST') {
      await handleResetPasswordPost(ctx, next, scope)
    } else {
      ctx.response.status = 405
      ctx.response.set('Allow', 'GET, POST')
      ctx.response.body = {
        code: 'method_not_allowed',
      }
    }
  } catch (exc) {
    log.error(exc)

    ctx.response.status = 500
    ctx.response.body = {
      code: 'internal_error',
    }
  }
}

export default handleResetPassword
