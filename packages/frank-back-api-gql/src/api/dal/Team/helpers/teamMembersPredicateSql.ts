import { Sql, and, join, sql, literal } from 'sql'
import { team, teamMember } from 'store/names'
import teamMemberPredicateSql from '../../TeamMember/helpers/teamMemberPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import TeamMembersWhere from './TeamMembersWhere'

const teamMembersPredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamMembersWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const membersAlias$: Sql = sql`${alias$}.members`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${teamMember}" "${membersAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${membersAlias$}"."${teamMember.teamId}"`,
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.any) {
    branches.push(
      join(
        [
          sql`exists (`,
          sql`select 1`,
          sql`from "${teamMember}" "${membersAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${membersAlias$}"."${teamMember.teamId}"`,
          and(teamMemberPredicateSql(membersAlias$, where.any)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.none) {
    branches.push(
      join(
        [
          sql`not exists (`,
          sql`select 1`,
          sql`from "${teamMember}" "${membersAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${membersAlias$}"."${teamMember.teamId}"`,
          and(teamMemberPredicateSql(membersAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => teamMembersPredicateSql(alias, x)))
    } else {
      branches.push(teamMembersPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => teamMembersPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, teamMembersPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default teamMembersPredicateSql
