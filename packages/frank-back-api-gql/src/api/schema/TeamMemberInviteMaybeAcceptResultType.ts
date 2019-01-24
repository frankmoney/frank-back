import { Type } from 'gql'
import TeamMemberInviteMaybeAcceptResultCodeType from './TeamMemberInviteMaybeAcceptResultCodeType'
import TeamMemberInviteType from './TeamMemberInviteType'
import TeamType from './TeamType'

const TeamMemberInviteMaybeAcceptResultType = Type(
  'TeamMemberInviteMaybeAccept',
  type =>
    type.fields(field => ({
      code: field.ofType(TeamMemberInviteMaybeAcceptResultCodeType),
      team: field.ofType(TeamType),
      invite: field.ofType(TeamMemberInviteType),
    }))
)

export default TeamMemberInviteMaybeAcceptResultType
