import Json from './Json'
import TeamMemberAcl from './TeamMemberAcl'

type TeamMember = {
  pid: number
  self: boolean
  email: string
  lastName?: string
  firstName: string
  color: number
  avatar?: Json
  role: string
  acl: TeamMemberAcl
}

export default TeamMember
