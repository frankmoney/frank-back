import teamInviteSendResolver from 'app/graphql/resolvers/teamInviteSend'
import TeamMemberRoleEnum from 'app/graphql/schema/TeamMemberRoleEnum'
import createMutations from 'utils/createMutations'
import TeamInviteType from '../TeamInviteType'

const teamInviteSend = createMutations(field => ({
  teamInviteSend: field
    .ofType(TeamInviteType)
    .args(arg => ({
      email: arg.ofString(),
      role: arg.ofType(TeamMemberRoleEnum),
      note: arg.ofString().nullable(),
    }))
    .resolve(teamInviteSendResolver)
}))

export default teamInviteSend
