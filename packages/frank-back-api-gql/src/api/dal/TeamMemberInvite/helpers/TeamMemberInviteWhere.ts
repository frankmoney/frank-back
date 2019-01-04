import WhereId from '../../helpers/WhereId'
import WhereString from '../../helpers/WhereString'

export default interface TeamMemberInviteWhere {
  id?: WhereId
  token?: WhereString
  email?: WhereString
  or?: TeamMemberInviteWhere | TeamMemberInviteWhere[]
  and?: TeamMemberInviteWhere | TeamMemberInviteWhere[]
}
