import { Type } from 'gql'

const TeamMemberAclType = Type('TeamMemberAcl', type =>
  type.fields(field => ({
    remove: field.ofBool(),
    editRole: field.ofBool(),
    editAvatar: field.ofBool(),
    editProfile: field.ofBool(),
    editPassword: field.ofBool(),
  }))
)

export default TeamMemberAclType
