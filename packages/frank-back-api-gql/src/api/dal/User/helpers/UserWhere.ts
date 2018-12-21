import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import UserTeamMembersWhere from './UserTeamMembersWhere'

export default interface UserWhere {
  id?: WhereId
  pid?: WherePid
  typeId?: WhereId
  name?: WhereString
  email?: WhereString
  teamMembers?: UserTeamMembersWhere
  or?: UserWhere | UserWhere[]
  and?: UserWhere | UserWhere[]
}
