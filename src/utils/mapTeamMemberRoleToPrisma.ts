import { throwArgumentError } from 'app/errors/ArgumentError'
import { TeamMemberRole } from 'app/graphql/generated/prisma'
import TeamMemberRoleEnum, {
  TeamMemberRoleEnumKeys,
} from 'app/graphql/schema/TeamMemberRoleEnum'

const mapTeamMemberRoleToPrisma = (
  role: TeamMemberRoleEnumKeys
): TeamMemberRole => {
  switch (role) {
    case TeamMemberRoleEnum.values.administrator:
      return 'ADMIN'
    case TeamMemberRoleEnum.values.manager:
      return 'MANAGER'
    case TeamMemberRoleEnum.values.observer:
      return 'MEMBER'
    default:
      return throwArgumentError()
  }
}

export default mapTeamMemberRoleToPrisma
