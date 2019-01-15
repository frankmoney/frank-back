import { Enum } from 'gql'
import TeamMemberInviteMaybeAcceptResultCode from 'api/types/TeamMemberInviteMaybeAcceptResultCode'

const TeamMemberInviteMaybeAcceptResultCodeType = Enum(
  'TeamMemberInviteMaybeAcceptCode',
  type =>
    type.values([
      TeamMemberInviteMaybeAcceptResultCode.lastTeamMember,
      TeamMemberInviteMaybeAcceptResultCode.accepted,
      TeamMemberInviteMaybeAcceptResultCode.outdated,
      TeamMemberInviteMaybeAcceptResultCode.other,
    ])
)

export default TeamMemberInviteMaybeAcceptResultCodeType
