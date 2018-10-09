import ExtendedBase from './ExtendedBase'

type TeamMember = ExtendedBase & {
  teamId: number
  userId: number
  roleId: number
}

export default TeamMember
