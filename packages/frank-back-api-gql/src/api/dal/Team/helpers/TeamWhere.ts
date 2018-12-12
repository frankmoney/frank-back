import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import TeamMembersWhere from './TeamMembersWhere'

export default interface TeamWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  members?: TeamMembersWhere
  or?: TeamWhere | TeamWhere[]
  and?: TeamWhere | TeamWhere[]
}
