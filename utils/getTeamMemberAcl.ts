import { TeamMember } from 'app/graphql/generated/prisma'

const getTeamMemberAcl = (self: TeamMember, member: TeamMember) => {
  const myself = member === self
  const admin = self.role === 'ADMIN'

  return {
    remove: admin && !myself,
    editRole: admin,
    editAvatar: admin || myself,
    editProfile: admin || myself,
    editPassword: myself,
  }
}

export default getTeamMemberAcl
