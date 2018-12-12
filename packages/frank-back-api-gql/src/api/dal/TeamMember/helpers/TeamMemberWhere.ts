import UserWhere from '../../User/helpers/UserWhere'
import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'

export default interface TeamMemberWhere {
  id?: WhereId
  pid?: WherePid
  user?: UserWhere
  or?: TeamMemberWhere | TeamMemberWhere[]
  and?: TeamMemberWhere | TeamMemberWhere[]
}
