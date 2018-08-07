import createPrivateResolver from 'utils/createPrivateResolver'
import { getTeammate } from './teammate'

export default createPrivateResolver(
  'editTeamMemberRole',
  async ({ args: { id, admin, canInvite, accountIds }, user, prisma }) => {
    await prisma.mutation.deleteManyTeamMemberAccounts({
      where: {
        teamMember: {
          id,
        },
      },
    })

    await prisma.mutation.updateTeamMember({
      where: {
        id,
      },
      data: {
        role: admin ? 'ADMIN' : 'MEMBER',
        canInvite,
        accounts: {
          create: accountIds.map((x: string) => ({
            account: {
              connect: {
                id: x,
              },
            },
          })),
        },
      },
    })

    return await getTeammate(id, user.id, prisma)
  }
)
