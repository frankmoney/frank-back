import { Type } from 'gql'
import TeamMemberType from '../TeamMemberType'
import teamMember from './teamMember'
import teamMembers from './teamMembers'

const TeamType = Type('Team', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    member: field
      .ofType(TeamMemberType)
      .args(arg => ({
        id: arg.ofID(),
      }))
      .resolve(teamMember),

    members: field.listOf(TeamMemberType).resolve(teamMembers),
  }))
)

export default TeamType
