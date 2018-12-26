import { URL } from 'url'
import { Context } from 'koa'
import config from 'config'
import { literal } from 'sql'
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
      const pr = await getPasswordReset(
        {
          where: {
            token: { eq: token },
            usedAt: { isNull: true },
            createdAt: {
              gt: literal(
                `(now() at time zone 'utc') - (interval '` +
                  config.RESET_PASSWORD_TOKEN_TTL_MINUTES +
                  ` minutes')`
              ),
            },
          },
        },
        scope
      )

      if (pr) {
        const user = await getUser({ where: { id: { eq: pr.userId } } }, scope)
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
        log.warn(
          `Attempt to use non-existent or expired reset password token ${token}`
        )

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
