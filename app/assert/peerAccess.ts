import { throwForbidden } from 'app/errors/ForbiddenError'
import { Query } from 'app/graphql/generated/prisma'

const assertPeerAccess = async (
  userId: string,
  peerId: string,
  { query }: { query: Query }
) => {
  const teamMembers = await query.teamMembers(
    {
      where: {
        user: {
          id: userId,
        },
        role_in: ['ADMIN', 'MANAGER'],
        team: {
          accounts_some: {
            peers_some: {
              id: peerId,
            },
          },
        },
      },
    },
    `{ id }`
  )

  if (!teamMembers || !teamMembers[0]) {
    throwForbidden()
  }
}

export default assertPeerAccess
