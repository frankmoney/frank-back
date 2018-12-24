import parseBody from 'co-body'
import { Context } from 'koa'
import passwordResetRequest from '@frankmoney/frank-mail/passwordResetRequest'
import { UserType } from 'store/enums'
import Scope from 'api/Scope'
import createPasswordReset from 'api/dal/PasswordReset/createPasswordReset'
import getUser from 'api/dal/User/getUser'

type Body = {
  email: string
}

const handleRecoverPassword = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('http:recoverPassword')

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

      if (!body.email) {
        return respondWithInvalidArgument('email')
      }

      const { email } = body

      const user = await getUser(
        {
          where: {
            typeId: { eq: UserType.person },
            name: { eq: email.toLowerCase() },
          },
        },
        scope
      )

      if (user) {
        const token = await createPasswordReset({ userId: user.id }, scope)

        try {
          const mail = passwordResetRequest({
            data: {
              user,
              link: scope.config.MAIL.links.passwordResetRequest({
                token,
              }),
            },
          })

          await scope.mailer.send({ to: user.email }, mail)

          log.debug(`Sent password reset request mail to ${user.email}`)
        } catch (exc) {
          log.error(
            exc,
            `Failed to send password reset request mail to ${user.email}`
          )

          ctx.response.status = 500
          ctx.response.body = {
            code: 'internal_error',
          }

          return
        }
      } else {
        log.warn(`Tried recovering password for non-registered email: ${email}`)
      }

      ctx.response.status = 200
      ctx.response.body = 'ok'
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

export default handleRecoverPassword
