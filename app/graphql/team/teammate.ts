import { Prisma } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type Result = null | {
  id: string
  lastName?: string
  firstName?: string
  admin: boolean
  canInvite: boolean
  accountIds: string[]
}

export const getTeammate = async (
  id: string,
  userId: string,
  prisma: Prisma
): Promise<Result> => {
  const rows = await prisma.query.teamMembers(
    {
      where: {
        AND: [
          { id },
          {
            team: {
              members_some: {
                user: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    },
    `{
      id
      user {
        lastName
        firstName
      }
      role
      canInvite
      accounts {
        account {
          id
        }
      }
    }`
  )

  const row = rows[0]

  if (!row) {
    throw new Error('Not Found.')
  }

  const {
    id: $id,
    user: { lastName, firstName },
    role,
    canInvite,
    accounts,
  } = row

  const admin = role !== 'MEMBER'

  const accountIds = (accounts || []).map(x => x.account.id)

  return {
    id: $id,
    lastName,
    firstName,
    admin,
    canInvite,
    accountIds,
  }
}

export default createPrivateResolver(
  'teammate',
  ({ args, user, prisma }): Promise<Result> =>
    getTeammate(args.id, args.userId || user.id, prisma)
)
