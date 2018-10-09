import { Type } from 'gql'
import TeamMemberRoleType from './TeamMemberRoleType'

const TeamMemberType = Type('TeamMember', type =>
  type.fields(field => ({
    pid: field.ofId(),
    self: field.ofBool(),
    email: field.ofString(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString(),
    avatar: field.ofJson().nullable(),
    role: field.ofType(TeamMemberRoleType),
  }))
)

export default TeamMemberType
