import createPrivateResolver from 'utils/createPrivateResolver'

type Result = ResultAccount[]

type ResultAccount = {
  id: string
  name: string
}

export default createPrivateResolver(
  async ({ user, prisma: { query } }): Promise<Result> => {
    const prismaResult = await query.teamMembers(
      {
        where: {
          user: {
            id: user.id,
          },
        },
      },
      `{
        team {
          accounts {
            id
            name
          }
        }
      }`
    )

    return (
      (prismaResult[0] &&
        prismaResult[0].team &&
        prismaResult[0].team.accounts) ||
      []
    )
  }
)
