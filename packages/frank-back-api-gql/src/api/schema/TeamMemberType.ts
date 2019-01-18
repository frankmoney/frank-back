import { Type } from 'gql'
import TeamMemberAclType from './TeamMemberAclType'
import TeamMemberRoleType from './TeamMemberRoleType'

const TeamMemberType = Type('TeamMember', type =>
  type.fields(field => ({
    pid: field.ofId(),
    self: field.ofBool(),
    email: field.ofString(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString(),
    color: field.ofInt(),
    avatar: field.ofJson().nullable(),
    role: field.ofType(TeamMemberRoleType),
    acl: field.ofType(TeamMemberAclType),
  }))
)

export default TeamMemberType
