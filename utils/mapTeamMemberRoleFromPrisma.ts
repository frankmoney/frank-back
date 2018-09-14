import { throwArgumentError } from 'app/errors/ArgumentError'
import { TeamMemberRole } from 'app/graphql/generated/prisma'
import TeamMemberRoleEnum, { TeamMemberRoleEnumKeys } from 'app/graphql/schema/TeamMemberRoleEnum'

const mapTeamMemberRoleFromPrisma = (role: TeamMemberRole): TeamMemberRoleEnumKeys => {
  switch (role) {
    case 'ADMIN':
      return TeamMemberRoleEnum.values.administrator
    case 'MANAGER':
      return TeamMemberRoleEnum.values.manager
    case 'MEMBER':
      return TeamMemberRoleEnum.values.observer
    default:
      return throwArgumentError()
  }
}

export default mapTeamMemberRoleFromPrisma
