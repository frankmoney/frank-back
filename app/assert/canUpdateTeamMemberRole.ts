import { throwForbidden } from 'app/errors/ForbiddenError'
import { Query } from 'app/graphql/generated/prisma'

const assertCanUpdateTeamMemberRole = async (
  currentUserId: string,
  subjectUserId: string,
  { query }: { query: Query }
) => {
  const teamMembers = await query.teamMembers({
    where: {
      user: { id: subjectUserId },
      team: {
        members_some: {
          user: {
            id: currentUserId,
          },
          role: 'ADMIN',
        },
      },
    },
  })

  if (!teamMembers || !teamMembers[0]) {
    throwForbidden()
  }
}

export default assertCanUpdateTeamMemberRole
