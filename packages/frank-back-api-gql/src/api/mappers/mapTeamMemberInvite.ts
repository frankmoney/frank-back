import Source from 'store/types/TeamMemberInvite'
import Target from 'api/types/TeamMemberInvite'
import Mapper from './Mapper'
import map from './map'

const mapTeamMemberInvite: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('token', 'token')
  .for('createdAt', 'createdAt')
  .for('updatedAt', 'updatedAt')
  .for('email', 'email')
  .for('note', 'note')
  .for('usedAt', 'usedAt')
  .build()

export default mapTeamMemberInvite
