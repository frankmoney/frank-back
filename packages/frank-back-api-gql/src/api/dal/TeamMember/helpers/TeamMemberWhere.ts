import TeamWhere from '../../Team/helpers/TeamWhere'
import UserWhere from '../../User/helpers/UserWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'

export default interface TeamMemberWhere {
  id?: WhereId
  pid?: WherePid
  team?: TeamWhere
  user?: UserWhere
  roleId?: WhereId
  or?: TeamMemberWhere | TeamMemberWhere[]
  and?: TeamMemberWhere | TeamMemberWhere[]
}
