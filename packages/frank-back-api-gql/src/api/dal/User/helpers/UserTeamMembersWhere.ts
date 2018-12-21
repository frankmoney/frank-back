import TeamMemberWhere from '../../TeamMember/helpers/TeamMemberWhere'

export default interface UserTeamMembersWhere {
  empty?: boolean
  any?: TeamMemberWhere
  none?: TeamMemberWhere
  or?: TeamMemberWhere | TeamMemberWhere[]
  and?: TeamMemberWhere | TeamMemberWhere[]
}
