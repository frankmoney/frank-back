import { Sql, and, join, sql, literal } from 'sql'
import { teamMember, user } from 'store/names'
import teamMemberPredicateSql from '../../TeamMember/helpers/teamMemberPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import UserTeamMembersWhere from './UserTeamMembersWhere'

const userTeamMembersPredicateSql = (
  alias: string | Sql,
  where: undefined | null | UserTeamMembersWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias
  const teamMembersAlias$: Sql = sql`${alias$}.teamMembers`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${teamMember}" "${teamMembersAlias$}"`,
          sql`where "${alias$}"."${user.id}"`,
          sql`= "${teamMembersAlias$}"."${teamMember.userId}"`,
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
          sql`from "${teamMember}" "${teamMembersAlias$}"`,
          sql`where "${alias$}"."${user.id}"`,
          sql`= "${teamMembersAlias$}"."${teamMember.userId}"`,
          and(teamMemberPredicateSql(teamMembersAlias$, where.any)),
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
          sql`from "${teamMember}" "${teamMembersAlias$}"`,
          sql`where "${alias$}"."${user.id}"`,
          sql`= "${teamMembersAlias$}"."${teamMember.userId}"`,
          and(teamMemberPredicateSql(teamMembersAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(
        ...where.and.map(x => userTeamMembersPredicateSql(alias, x))
      )
    } else {
      branches.push(userTeamMembersPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => userTeamMembersPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, userTeamMembersPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default userTeamMembersPredicateSql
