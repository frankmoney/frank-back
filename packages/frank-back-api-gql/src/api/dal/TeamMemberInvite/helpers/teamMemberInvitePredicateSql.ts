import { Sql, literal, sql } from 'sql'
import { teamMemberInvite } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import TeamMemberInviteWhere from './TeamMemberInviteWhere'

const teamMemberInvitePredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamMemberInviteWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${teamMemberInvite.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${teamMemberInvite.token}"`, where.token),
    createWhereSql(sql`"${alias$}"."${teamMemberInvite.email}"`, where.email),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(
        ...where.and.map(x => teamMemberInvitePredicateSql(alias, x))
      )
    } else {
      branches.push(teamMemberInvitePredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => teamMemberInvitePredicateSql(alias, x))
      )
    } else {
      return disjunction(
        junction,
        teamMemberInvitePredicateSql(alias, where.or)
      )
    }
  } else {
    return junction
  }
}

export default teamMemberInvitePredicateSql
