import { Sql, join, literal, sql } from 'sql'
import { AccountAccessRole, TeamMemberRole } from 'store/enums'
import { account, teamMember } from 'store/names'
import Id from 'store/types/Id'

const accountFieldsSql = (
  alias: string | Sql,
  args: { userId?: null | Id }
): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const userId = (args && args.userId) || null

  const accessRoleSql = userId
    ? sql`
      case (
        select m."${teamMember.roleId}"
        from "${teamMember}" m
        where m."${teamMember.userId}" = ${userId}
        and m."${teamMember.teamId}" =
          "${alias$}"."${account.teamId}"
      )
        when ${TeamMemberRole.administrator}
          then ${AccountAccessRole.administrator}::varchar(128)
          
        when ${TeamMemberRole.manager}
          then ${AccountAccessRole.manager}::varchar(128)
          
        when ${TeamMemberRole.observer}
          then ${AccountAccessRole.observer}::varchar(128)
          
        else
          ${AccountAccessRole.visitor}::varchar(128)
      end
    `
    : sql`${AccountAccessRole.nobody}::varchar(128)`

  return join(
    [
      sql`${accessRoleSql} "accessRole"`,
      sql`"${alias$}"."${account.id}"`,
      sql`"${alias$}"."${account.pid}"`,
      sql`"${alias$}"."${account.createdAt}"`,
      sql`"${alias$}"."${account.creatorId}"`,
      sql`"${alias$}"."${account.updatedAt}"`,
      sql`"${alias$}"."${account.updaterId}"`,
      sql`"${alias$}"."${account.data}"`,
      sql`"${alias$}"."${account.name}"`,
      sql`"${alias$}"."${account.teamId}"`,
      sql`"${alias$}"."${account.currencyCode}"`,
      sql`"${alias$}"."${account.public}"`,
    ],
    ', '
  )
}

export default accountFieldsSql
