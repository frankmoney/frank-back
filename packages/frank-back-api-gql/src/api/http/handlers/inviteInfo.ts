import getTeam from 'api/dal/Team/getTeam'
import mapTeam from 'api/mappers/mapTeam'
import getTeamMemberInvite from 'api/dal/TeamMemberInvite/getTeamMemberInvite'
import getUser from 'api/dal/User/getUser'
import mapUser from 'api/mappers/mapUser'
import { Context } from 'koa'
import R from 'ramda'
import Scope from 'api/Scope'

export default async (
  ctx: Context,
  next: () => Promise<any>,
  scope: Scope,
) => {

  const token = ctx.query.token && ctx.query.token.trim()

  try {

    if (!token) {
      throw new Error('Token param undefined')
    }

    const teamMemberInvite = await getTeamMemberInvite(
      {
        where: {
          token: { eq: token },
        },
      },
      scope,
    )

    if (!teamMemberInvite) {
      throw new Error('TeamMemberInvite not found')
    }

    const team = await getTeam(
      {
        where: {
          id: { eq: teamMemberInvite.teamId },
        },
      },
      scope,
    )

    const user = await getUser(
      {
        where: {
          email: { eq: teamMemberInvite.email },
        },
      },
      scope,
    )

    ctx.response.status = 200
    ctx.response.body = {
      ...R.pick(['email', 'note'], teamMemberInvite!),
      team: R.pick(['pid', 'name'], mapTeam(team)),
      existingUser: (user || null) && R.pick(['pid', 'email', 'firstName', 'lastName', 'avatar'], mapUser(user)),
      isUsed: !!teamMemberInvite.usedAt,
    }

  } catch (e) {

    ctx.response.status = 404
    ctx.response.body = {
      error: 'Invalid invite token',
    }
  }
}
