import createTeamResolver from 'app/resolvers/factories/createTeamResolver'

const teamInviteTeam = createTeamResolver(
  'TeamInvite:team',
  ({ parent }) => ({ id: parent.id })
)

export default teamInviteTeam
