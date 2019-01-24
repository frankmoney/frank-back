import { Sql, join, literal, sql } from 'sql'
import { teamMember } from 'store/names'

const teamMemberFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${teamMember.id}"`,
      sql`"${alias$}"."${teamMember.pid}"`,
      sql`"${alias$}"."${teamMember.createdAt}"`,
      sql`"${alias$}"."${teamMember.creatorId}"`,
      sql`"${alias$}"."${teamMember.updatedAt}"`,
      sql`"${alias$}"."${teamMember.updaterId}"`,
      sql`"${alias$}"."${teamMember.teamId}"`,
      sql`"${alias$}"."${teamMember.userId}"`,
      sql`"${alias$}"."${teamMember.roleId}"`,
    ],
    ', '
  )
}

export default teamMemberFieldsSql
