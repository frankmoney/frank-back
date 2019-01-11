import { Type } from 'gql'
import UserType  from './UserType'
import TeamType from './TeamType'

const InviteInfoType = Type('InviteInfo', type =>
  type.fields(field => ({
    email: field.ofString(),
    note: field.ofString().nullable(),
    team: field.ofType(TeamType),
    existingUser: field.ofType(UserType).nullable(),
  }))
)

export default InviteInfoType
