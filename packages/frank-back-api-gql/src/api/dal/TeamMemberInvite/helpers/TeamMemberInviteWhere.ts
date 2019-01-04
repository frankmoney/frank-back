import TeamWhere from '../../Team/helpers/TeamWhere'
import WhereDateTimeNullable from '../../helpers/WhereDateTimeNullable'
import WhereId from '../../helpers/WhereId'
import WhereString from '../../helpers/WhereString'

export default interface TeamMemberInviteWhere {
  id?: WhereId
  token?: WhereString
  email?: WhereString
  usedAt?: WhereDateTimeNullable
  team?: TeamWhere
  or?: TeamMemberInviteWhere | TeamMemberInviteWhere[]
  and?: TeamMemberInviteWhere | TeamMemberInviteWhere[]
}
