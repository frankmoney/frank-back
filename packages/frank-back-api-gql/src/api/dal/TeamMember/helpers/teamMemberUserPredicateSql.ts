import { Sql, join, literal, sql } from 'sql'
import { teamMember, user } from 'store/names'
import UserWhere from '../../User/helpers/UserWhere'
import userPredicateSql from '../../User/helpers/userPredicateSql'

const teamMemberUserPredicateSql = (
  alias: string | Sql,
  where: undefined | null | UserWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const userAlias$: Sql = sql`${alias$}.user`

  const userWhereSql = userPredicateSql(userAlias$, where)

  if (!userWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${user}" "${userAlias$}"`,
      sql`where "${alias$}"."${teamMember.userId}"`,
      sql`= "${userAlias$}"."${user.id}"`,
      sql`and ${userWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default teamMemberUserPredicateSql
