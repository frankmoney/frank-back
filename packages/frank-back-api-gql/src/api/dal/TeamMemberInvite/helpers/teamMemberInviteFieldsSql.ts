import { Sql, join, literal, sql } from 'sql'
import { teamMemberInvite } from 'store/names'

const teamMemberInviteFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${teamMemberInvite.id}"`,
      sql`"${alias$}"."${teamMemberInvite.token}"`,
      sql`"${alias$}"."${teamMemberInvite.createdAt}"`,
      sql`"${alias$}"."${teamMemberInvite.creatorId}"`,
      sql`"${alias$}"."${teamMemberInvite.updatedAt}"`,
      sql`"${alias$}"."${teamMemberInvite.email}"`,
      sql`"${alias$}"."${teamMemberInvite.note}"`,
      sql`"${alias$}"."${teamMemberInvite.usedAt}"`,
      sql`"${alias$}"."${teamMemberInvite.teamId}"`,
      sql`"${alias$}"."${teamMemberInvite.roleId}"`,
      sql`"${alias$}"."${teamMemberInvite.userId}"`,
    ],
    ' '
  )
}

export default teamMemberInviteFieldsSql
