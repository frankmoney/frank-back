import { throwForbidden } from 'app/errors/ForbiddenError'
import { Query } from 'app/graphql/generated/prisma'

const assertAccountAccess = async (
  userId: string,
  accountId: string,
  { query }: { query: Query }
) => {
  const r = await query.team

  const teamMembers = await query.teamMembers(
    {
      where: {
        user: {
          id: userId,
        },
        accounts_some: {
          account: {
            id: accountId,
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

export default assertAccountAccess
