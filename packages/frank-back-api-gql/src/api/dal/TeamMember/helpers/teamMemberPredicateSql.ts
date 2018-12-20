import { Sql, literal, sql } from 'sql'
import { teamMember } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import TeamMemberWhere from './TeamMemberWhere'
import teamMemberTeamPredicateSql from './teamMemberTeamPredicateSql'
import teamMemberUserPredicateSql from './teamMemberUserPredicateSql'

const teamMemberPredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamMemberWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${teamMember.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${teamMember.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${teamMember.roleId}"`, where.roleId),
    teamMemberTeamPredicateSql(alias$, where.team),
    teamMemberUserPredicateSql(alias$, where.user),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => teamMemberPredicateSql(alias, x)))
    } else {
      branches.push(teamMemberPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => teamMemberPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, teamMemberPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default teamMemberPredicateSql
