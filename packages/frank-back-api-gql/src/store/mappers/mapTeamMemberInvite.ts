import { teamMemberInvite } from '../names'
import TeamMemberInvite from '../types/TeamMemberInvite'
import Mapper from './Mapper'
import map from './map'

const mapTeamMemberInvite: Mapper<TeamMemberInvite> = map<TeamMemberInvite>()
  .from(teamMemberInvite)
  .for('id', x => x.id)
  .for('token', x => x.token)
  .for('createdAt', x => x.createdAt)
  .for('creatorId', x => x.creatorId)
  .for('updatedAt', x => x.updatedAt)
  .for('email', x => x.email)
  .for('note', x => x.note)
  .for('usedAt', x => x.usedAt)
  .for('teamId', x => x.teamId)
  .for('roleId', x => x.roleId)
  .for('userId', x => x.userId)
  .build()

export default mapTeamMemberInvite
