import parseBody from 'co-body'
import { Context } from 'koa'
import userCreationConfirmationMail from '@frankmoney/frank-mail/userCreationConfirmation'
import config from 'config'
import { TeamMemberRole } from 'store/enums'
import hashPassword from 'utils/hashPassword'
import Scope from 'api/Scope'
import createTeam from 'api/dal/Team/createTeam'
import createTeamMember from 'api/dal/TeamMember/createTeamMember'
import createPersonUserMaybe from 'api/dal/User/createPersonUserMaybe'

type Body = {
  team: {
    name: string
    city?: string
    size?: string
  }
  user: {
    email: string
    password: string
    lastName?: string
    firstName: string
    phone?: string
  }
}

const nullOrEmpty = (str: undefined | null | string) => !str || !str.trim()
const normalize = (str: undefined | null | string) =>
  nullOrEmpty(str) ? null : str!.trim()

const handleSignUp = async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope
) => {
  const log = scope.logFor('http:signUp')

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

      if (!body.team) {
        return respondWithInvalidArgument('team')
      }

      if (!body.user) {
        return respondWithInvalidArgument('user')
      }

      if (nullOrEmpty(body.team.name)) {
        return respondWithInvalidArgument('team.name')
      }

      if (nullOrEmpty(body.user.email)) {
        return respondWithInvalidArgument('user.email')
      }

      if (nullOrEmpty(body.user.password)) {
        return respondWithInvalidArgument('user.password')
      }

      if (nullOrEmpty(body.user.firstName)) {
        return respondWithInvalidArgument('user.firstName')
      }

      const name = body.team.name.trim()
      const city = normalize(body.team.city)
      const size = normalize(body.team.size)

      const email = body.user.email.trim()
      const lastName = normalize(body.user.lastName)
      const firstName = body.user.firstName.trim()
      const phone = normalize(body.user.phone)

      const passwordHash = hashPassword(body.user.password)

      const color =
        config.USER_COLORS[
          Math.floor(Math.random() * config.USER_COLORS.length)
        ]

      const teamId = await createTeam(
        {
          name,
          city,
          size,
        },
        scope
      )

      const { status, userId } = await createPersonUserMaybe(
        {
          email,
          passwordHash,
          lastName,
          firstName,
          color,
          phone,
        },
        scope
      )

      if (status === 'duplicate') {
        ctx.response.status = 409
        ctx.response.body = {
          code: 'email_in_use',
        }
        return
      }

      await createTeamMember(
        {
          teamId,
          userId,
          roleId: TeamMemberRole.administrator,
        },
        scope
      )

      await scope.uow.commit()

      try {
        const mail = userCreationConfirmationMail({
          data: {
            user: {
              lastName,
              firstName,
            },
            link: config.MAIL.links.userCreationConfirmation({
              token: userId,
            }),
          },
        })

        await scope.mailer.send({ to: email }, mail)

        log.info(`Sent user creation confirmation mail to "${email}"`)
      } catch (exc) {
        log.error(
          exc,
          `Failed to send user creation confirmation mail to "${email}"`
        )
      }

      ctx.response.status = 201
      ctx.response.set('X-Authenticated-User-Id', userId.toString())
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

export default handleSignUp
