import getTeam from 'api/dal/Team/getTeam'
import mapTeam from 'api/mappers/mapTeam'
import getTeamMemberInvite from 'api/dal/TeamMemberInvite/getTeamMemberInvite'
import getUser from 'api/dal/User/getUser'
import mapUser from 'api/mappers/mapUser'
import createResolver from './utils/createResolver'
import R from 'ramda'

export default createResolver('inviteInfo', async ({ args: { token }, scope }) => {

  const teamMemberInvite = await getTeamMemberInvite({
    where: {
      token: { eq: token },
    },
  }, scope)

  if (teamMemberInvite) {

    const team = await getTeam({
      where: {
        id: { eq: teamMemberInvite.teamId },
      },
    }, scope)

    const user = await getUser({
      where: {
        email: { eq: teamMemberInvite.email },
      },
    }, scope)

    return {
      ...R.pick(['email', 'note'], teamMemberInvite),
      team: mapTeam(team),
      existingUser: mapUser(user),
    }
  }
  else {
    return null
  }
})
