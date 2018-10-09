import Json from './Json'

type TeamMember = {
  pid: number
  self: boolean
  email: string
  lastName?: string
  firstName: string
  avatar?: Json
  role: string
}

export default TeamMember
