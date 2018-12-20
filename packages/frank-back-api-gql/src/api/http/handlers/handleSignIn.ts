import parseBody from 'co-body'
import { Context } from 'koa'
import config from 'config'
import { UserType } from 'store/enums'
import verifyPassword from 'utils/verifyPassword'
import Scope from 'api/Scope'
import getUser from 'api/dal/User/getUser'

type Body = {
  username: string
  password: string
}

const handleSignIn = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('http:signIn')

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

      if (!body.username) {
        return respondWithInvalidArgument('username')
      }

      if (!body.password) {
        return respondWithInvalidArgument('password')
      }

      const { username, password } = body

      const user = await getUser(
        {
          where: {
            typeId: { eq: UserType.person },
            name: { eq: username.toLowerCase() },
          },
        },
        scope
      )

      if (!user) {
        ctx.response.status = 401
        ctx.response.body = {
          code: 'invalid_credentials',
        }
        return
      }

      if (!config.AUTHENTICATION_DISABLED) {
        if (!verifyPassword(password, user.passwordHash)) {
          ctx.response.status = 401
          ctx.response.body = {
            code: 'invalid_credentials',
          }
          return
        }
      }

      ctx.response.status = 200
      ctx.response.set('X-Authenticated-User-Id', user.id.toString())
      ctx.response.body = {
        code: 'signed_in',
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

export default handleSignIn
