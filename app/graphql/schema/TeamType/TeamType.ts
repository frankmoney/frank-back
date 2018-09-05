import { Type } from 'gql'
import TeamMemberType from '../TeamMemberType'
import teamMembers from './teamMembers'

const TeamType = Type('Team', type =>
  type.fields(field => ({
    id: field.ofID(),

    name: field.ofString(),

    members: field.listOf(TeamMemberType).resolve(teamMembers),
  }))
)

export default TeamType
