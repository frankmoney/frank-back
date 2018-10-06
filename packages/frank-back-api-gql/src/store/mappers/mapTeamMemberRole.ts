import { TeamMemberRole as Enum } from '../enums'
import { teamMemberRole } from '../names'

const mapTeamMemberRole = (source: any): Enum =>
  <Enum>source[teamMemberRole.id.toString()]

export default mapTeamMemberRole
