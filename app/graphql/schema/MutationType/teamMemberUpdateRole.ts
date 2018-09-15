import teamMemberUpdateRole from 'app/graphql/resolvers/teamMemberUpdateRole'
import TeamMemberRoleEnum from 'app/graphql/schema/TeamMemberRoleEnum'
import TeamMemberType from 'app/graphql/schema/TeamMemberType'
import createMutations from 'utils/createMutations'

export default createMutations(field => ({
  teamMemberUpdateRole: field
    .ofType(TeamMemberType)
    .args(arg => ({
      id: arg.ofID(),
      role: arg.ofType(TeamMemberRoleEnum),
    }))
    .resolve(teamMemberUpdateRole),
}))
