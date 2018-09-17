import { Team, TeamWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createTeamResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => TeamWhereInput | Promise<TeamWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const first = 1

    const teams = await query.teams<Team[]>(
      { where, first },
      `{ id, name }`
    )

    const team = (teams && teams[0]) || undefined

    return team
  })

export default createTeamResolver
