import { Type } from 'gql'
import UserType from './UserType'
import TeamType from './TeamType'

const InviteInfoType = Type('InviteInfo', type =>
  type.fields(field => ({
    team: field.ofType(TeamType),
    email: field.ofString(),
    note: field.ofString().nullable(),
    existingUser: field.ofType(UserType).nullable(),
    isUsed: field.ofBool(),
  }))
)

export default InviteInfoType
