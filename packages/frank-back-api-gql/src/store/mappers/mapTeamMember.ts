import { teamMember } from '../names'
import TeamMember from '../types/TeamMember'
import Mapper from './Mapper'
import map from './map'

const mapTeamMember: Mapper<TeamMember> = map<TeamMember>()
  .from(teamMember)
  .extend()
  .for('teamId', x => x.teamId)
  .for('userId', x => x.userId)
  .for('roleId', x => x.roleId)
  .build()

export default mapTeamMember
