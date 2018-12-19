import { Sql, literal, sql } from 'sql'
import { user } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import UserWhere from './UserWhere'
import userTeamMembersPredicateSql from './userTeamMembersPredicateSql'

const userPredicateSql = (
  alias: string | Sql,
  where: undefined | null | UserWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${user.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${user.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${user.typeId}"`, where.typeId),
    userTeamMembersPredicateSql(alias$, where.teamMembers),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => userPredicateSql(alias, x)))
    } else {
      branches.push(userPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => userPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, userPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default userPredicateSql
