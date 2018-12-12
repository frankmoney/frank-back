import { Sql, literal, sql } from 'sql'
import { team } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import TeamWhere from './TeamWhere'
import teamMembersPredicateSql from './teamMembersPredicateSql'

const teamPredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${team.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${team.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${team.name}"`, where.name),
    teamMembersPredicateSql(alias, where.members),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => teamPredicateSql(alias, x)))
    } else {
      branches.push(teamPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => teamPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, teamPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default teamPredicateSql
