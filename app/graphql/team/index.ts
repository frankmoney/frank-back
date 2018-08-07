import editTeamMemberRole from './editTeamMemberRole'
import team from './team'
import teamAccounts from './teamAccounts'
import teammate from './teammate'

export default {
  Query: {
    team,
    teamAccounts,
    teammate,
  },
  Mutation: {
    editTeamMemberRole,
  },
}
