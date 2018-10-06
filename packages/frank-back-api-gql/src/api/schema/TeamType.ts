import { Type } from 'gql'

const TeamType = Type('Team', type =>
  type.fields(field => ({
    pid: field.ofId(),
    name: field.ofString(),
  }))
)

export default TeamType
