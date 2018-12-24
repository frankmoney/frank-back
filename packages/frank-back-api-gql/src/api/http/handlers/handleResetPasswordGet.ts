import { URL } from 'url'
import { Context } from 'koa'
import Scope from 'api/Scope'
import getPasswordReset from 'api/dal/PasswordReset/getPasswordReset'
import getUser from 'api/dal/User/getUser'

const handleResetPasswordGet = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('handleResetPasswordGet')

  try {
    const url = new URL(ctx.request.url, 'http://0.0.0.0')
    const token = url.searchParams.get('token')

    if (token) {
      const pr = await getPasswordReset({ token }, scope)
      log.info('pr:', pr)
      if (pr) {
        const user = await getUser({ where: { id: { eq: pr.userId } } }, scope)
        log.info('user:', user)

        if (user) {
          ctx.response.status = 200
          ctx.response.body = {
            token: pr.token,
            email: user.email,
          }
        } else {
          ctx.response.status = 404
          ctx.response.body = {
            code: 'not_found',
          }
        }
      } else {
        ctx.response.status = 404
        ctx.response.body = {
          code: 'not_found',
        }
      }
    } else {
      ctx.response.status = 401
      ctx.response.body = {
        code: 'invalid_argument',
        field: 'token',
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

export default handleResetPasswordGet
