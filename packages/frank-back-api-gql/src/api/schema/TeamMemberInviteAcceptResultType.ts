import { Type } from 'gql'
import TeamType from './TeamType'

const TeamMemberInviteAcceptResultType = Type('TeamMemberInviteAccept', type =>
  type.fields(field => ({
    team: field.ofType(TeamType),
  }))
)

export default TeamMemberInviteAcceptResultType
