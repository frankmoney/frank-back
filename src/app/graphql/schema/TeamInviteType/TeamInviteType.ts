import { Type } from 'gql'
import TeamMemberRoleEnum from '../TeamMemberRoleEnum'
import TeamType from '../TeamType'
import teamInviteTeam from './teamInviteTeam'

const TeamInviteType = Type('TeamInvite', type =>
  type.fields(field => ({
    id: field.ofID(),
    email: field.ofString(),
    role: field.ofType(TeamMemberRoleEnum),
    note: field.ofString().nullable(),
    team: field.ofType(TeamType).resolve(teamInviteTeam),
  }))
)

export default TeamInviteType
