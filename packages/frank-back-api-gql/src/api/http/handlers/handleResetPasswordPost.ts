import parseBody from 'co-body'
import { Context } from 'koa'
import { literal, sql } from 'sql'
import config from 'config'
import { SystemUserId } from 'store/enums'
import hashPassword from 'utils/hashPassword'
import Scope from 'api/Scope'
import getPasswordReset from 'api/dal/PasswordReset/getPasswordReset'
import updatePasswordReset from 'api/dal/PasswordReset/updatePasswordReset'
import getUser from 'api/dal/User/getUser'
import updateUser from 'api/dal/User/updateUser'

type Body = {
  token: string
  password: string
}

const handleResetPasswordPost = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('http:resetPasswordPost')

  try {
    if (ctx.is('json')) {
      const respondWithInvalidArgument = (field?: string) => {
        ctx.response.status = 401
        ctx.response.body = {
          code: 'invalid_argument',
          field,
        }
      }

      const body: Body = await parseBody.json(ctx)

      if (!body) {
        return respondWithInvalidArgument()
      }

      if (!body.token) {
        return respondWithInvalidArgument('token')
      }

      if (!body.password) {
        return respondWithInvalidArgument('password')
      }

      const { token, password } = body

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
          const passwordHash = hashPassword(password)

          const userId = await updateUser(
            {
              userId: SystemUserId.system,
              update: { passwordHash },
              where: { id: { eq: user.id } },
            },
            scope
          )

          if (userId) {
            const prId = await updatePasswordReset(
              {
                update: { usedAt: sql`now() at time zone 'utc'` },
                where: {
                  id: { eq: pr.id },
                  usedAt: { isNull: true },
                },
              },
              scope
            )

            if (prId) {
              log.info(`Reset password of user #${userId} via token ${token}`)

              ctx.response.status = 200
              ctx.response.body = { code: 'success' }
            } else {
              log.error(`Failed to mark password token ${token} as used`)

              ctx.response.status = 500
              ctx.response.body = { code: 'internal_error' }
            }
          } else {
            log.error(
              `Failed to reset password of user #${user.id} via token ${token}`
            )

            ctx.response.status = 500
            ctx.response.body = { code: 'internal_error' }
          }
        } else {
          log.error(
            `Could not find user associated with password reset token ${token}`
          )

          ctx.response.status = 404
          ctx.response.body = { code: 'not_found' }
        }
      } else {
        log.warn(
          `Tried to use non-existent or expired password reset token: ${token}`
        )

        ctx.response.status = 404
        ctx.response.body = { code: 'not_found' }
      }
    } else {
      ctx.response.status = 415
      ctx.response.body = {
        code: 'invalid_body_type',
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

export default handleResetPasswordPost
