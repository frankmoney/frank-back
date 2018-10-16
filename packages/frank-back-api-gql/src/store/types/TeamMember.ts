import ExtendedBase from './ExtendedBase'
import Id from './Id'

type TeamMember = ExtendedBase & {
  teamId: Id
  userId: Id
  roleId: Id
}

export default TeamMember
