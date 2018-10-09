import { Enum } from 'gql'
import { TeamMemberRole } from 'store/enums'

const TeamMemberRoleType = Enum('TeamMemberRole', type =>
  type.values([
    TeamMemberRole[TeamMemberRole.administrator],
    TeamMemberRole[TeamMemberRole.manager],
    TeamMemberRole[TeamMemberRole.observer],
  ])
)

export default TeamMemberRoleType
