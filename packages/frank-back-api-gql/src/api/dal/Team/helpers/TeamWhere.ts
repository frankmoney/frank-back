import WhereId from '../../helpers/WhereId'
import WherePid from '../../helpers/WherePid'
import WhereString from '../../helpers/WhereString'
import TeamAccountsWhere from './TeamAccountsWhere'
import TeamMembersWhere from './TeamMembersWhere'

export default interface TeamWhere {
  id?: WhereId
  pid?: WherePid
  name?: WhereString
  members?: TeamMembersWhere
  accounts?: TeamAccountsWhere
  or?: TeamWhere | TeamWhere[]
  and?: TeamWhere | TeamWhere[]
}
