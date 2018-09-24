import createTeamResolver from 'app/resolvers/factories/createTeamResolver'

const teamInviteTeam = createTeamResolver('TeamInvite:team', ({ parent }) => ({
  invites_some: { id: parent.id },
}))

export default teamInviteTeam
