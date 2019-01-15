import { Context } from 'koa'
import R from 'ramda'
import { UserType } from 'store/enums'
import Scope from 'api/Scope'
import getTeam from 'api/dal/Team/getTeam'
import getTeamMemberInvite from 'api/dal/TeamMemberInvite/getTeamMemberInvite'
import getUser from 'api/dal/User/getUser'
import mapTeam from 'api/mappers/mapTeam'
import mapUser from 'api/mappers/mapUser'

export default async (ctx: Context, next: () => Promise<any>, scope: Scope) => {
  const log = scope.logFor('http:inviteInfo')
  try {
    const token = ctx.query.token && ctx.query.token.trim()

    if (!token) {
      throw new Error('Missing token query parameter')
    }

    const teamMemberInvite = await getTeamMemberInvite(
      {
        where: {
          token: { eq: token },
        },
      },
      scope
    )

    if (!teamMemberInvite) {
      throw new Error(`Invite with token ${token} not found`)
    }

    const team = await getTeam(
      {
        where: {
          id: { eq: teamMemberInvite.teamId },
        },
      },
      scope
    )

    if (teamMemberInvite.usedAt && teamMemberInvite.teamId !== team.id) {
      throw new Error(
        `Invite with token ${token} already used at ${teamMemberInvite.usedAt}`
      )
    }

    const user = await getUser(
      {
        where: {
          typeId: { eq: UserType.person },
          name: { eq: teamMemberInvite.email.toLowerCase() },
        },
      },
      scope
    )

    ctx.response.status = 200
    ctx.response.body = {
      ...R.pick(['email', 'note'], teamMemberInvite!),
      team: R.pick(['pid', 'name'], mapTeam(team)),
      existingUser:
        (user || null) &&
        R.pick(
          ['pid', 'email', 'firstName', 'lastName', 'avatar'],
          mapUser(user)
        ),
      isUsed: !!teamMemberInvite.usedAt,
    }
  } catch (exc) {
    log.error(exc, 'Could not get valid team member invite token')

    ctx.response.status = 404
    ctx.response.body = {
      error: 'Invalid invite token',
    }
  }
}
