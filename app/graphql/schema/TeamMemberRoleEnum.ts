import { Enum } from 'gql'

const TeamMemberRoleEnum = Enum('TeamMemberRole', type =>
  type.values(['administrator', 'manager', 'observer'])
)

export default TeamMemberRoleEnum

export type TeamMemberRoleEnumKeys = 'administrator' | 'manager' | 'observer'
