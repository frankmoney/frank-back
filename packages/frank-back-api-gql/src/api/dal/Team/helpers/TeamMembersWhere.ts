import TeamMemberWhere from '../../TeamMember/helpers/TeamMemberWhere'

export default interface TeamMembersWhere {
  empty?: boolean
  any?: TeamMemberWhere
  none?: TeamMemberWhere
  or?: TeamMembersWhere | TeamMembersWhere[]
  and?: TeamMembersWhere | TeamMembersWhere[]
}
