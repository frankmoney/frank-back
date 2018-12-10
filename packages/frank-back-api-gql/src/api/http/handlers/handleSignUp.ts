import parseBody from 'co-body'
import { Context } from 'koa'
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

    const passwordHash = hashPassword(body.user.password)

    const teamId = await createTeam(
      {
        name: body.team.name.trim(),
        city: normalize(body.team.city),
        size: normalize(body.team.size),
      },
      scope
    )

    const color =
      config.USER_COLORS[Math.floor(Math.random() * config.USER_COLORS.length)]

    const { status, userId } = await createPersonUserMaybe(
      {
        email: body.user.email.trim(),
        passwordHash,
        lastName: normalize(body.user.lastName),
        firstName: body.user.firstName.trim(),
        color,
        phone: normalize(body.user.phone),
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

    ctx.response.status = 201
    ctx.response.body = {
      token: body.user.email.trim().toLowerCase(),
    }
  } else {
    ctx.response.status = 415
    ctx.response.body = {
      code: 'invalid_body_type',
    }
  }
}

export default handleSignUp
