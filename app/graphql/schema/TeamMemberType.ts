import TeamMemberRoleEnum from 'app/graphql/schema/TeamMemberRoleEnum'
import { String, Type } from 'gql'
import TeamMemberAclType from './TeamMemberAclType'

const TeamMemberType = Type('TeamMember', type =>
  type.fields(field => ({
    id: field.ofID(),
    self: field.ofBool(),
    email: field.ofString(),
    lastName: field.ofString().nullable(),
    firstName: field.ofString().nullable(),
    avatar: field.ofJson(),
    role: field.ofType(TeamMemberRoleEnum),
    admin: field.ofBool(),
    canInvite: field.ofBool(),
    accountIds: field.listOf(String),
    acl: field.ofType(TeamMemberAclType),
  }))
)

export default TeamMemberType
