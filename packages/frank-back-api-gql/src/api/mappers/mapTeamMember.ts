import { TeamMemberRole } from 'store/enums'
import TeamMember from 'store/types/TeamMember'
import User from 'store/types/User'
import Target from 'api/types/TeamMember'
import Mapper from './Mapper'
import map from './map'

type Source = {
  member: TeamMember
  user: User
  currentUserId: number
  admin?: boolean
}

const mapTeamMember: Mapper<Target, Source> = map<Target>()
  .from<Source>()
  .for('pid', m => m.use(x => x.user.pid))
  .for('email', m => m.use(x => x.user.email))
  .for('lastName', m => m.use(x => x.user.lastName))
  .for('firstName', m => m.use(x => x.user.firstName))
  .for('avatar', m => m.use(x => x.user.avatar))
  .for('role', m => m.use(x => TeamMemberRole[x.member.roleId]))
  .for('self', m => m.use(x => x.currentUserId === x.user.id))
  .for('acl', m =>
    m.use(({ member, user, currentUserId, admin }) => {
      const self = user.id === currentUserId
      return {
        remove: !!admin && !self,
        editRole: !!admin,
        editAvatar: !!admin || self,
        editProfile: !!admin || self,
        editPassword: self,
      }
    })
  )
  .build()

export default mapTeamMember
