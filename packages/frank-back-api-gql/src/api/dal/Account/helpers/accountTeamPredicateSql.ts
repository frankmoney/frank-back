import { Sql, join, literal, sql } from 'sql'
import { account, team } from 'store/names'
import TeamWhere from '../../Team/helpers/TeamWhere'
import teamPredicateSql from '../../Team/helpers/teamPredicateSql'

const accountTeamPredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const teamAlias$: Sql = sql`${alias$}.team`

  const teamWhereSql = teamPredicateSql(teamAlias$, where)

  if (!teamWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${team}" "${teamAlias$}"`,
      sql`where "${alias$}"."${account.teamId}"`,
      sql`= "${teamAlias$}"."${team.id}"`,
      sql`and ${teamWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default accountTeamPredicateSql
