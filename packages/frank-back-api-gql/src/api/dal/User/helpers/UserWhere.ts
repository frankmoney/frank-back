import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import UserTeamMembersWhere from './UserTeamMembersWhere'

export default interface UserWhere {
  id?: WhereId
  pid?: WherePid
  typeId?: WhereId
  teamMembers?: UserTeamMembersWhere
  or?: UserWhere | UserWhere[]
  and?: UserWhere | UserWhere[]
}
