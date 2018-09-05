import { Team, TeamWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

const team = createPrivateResolver(
  'team',
  async ({ user, prisma: { query } }) => {
    const where: TeamWhereInput = {
      members_some: {
        user: {
          id: user.id,
        },
      },
    }

    const result = await query.teams<Team[]>({ where }, `{ id, name }`)

    return result[0]
  }
)

export default team
