import { Sql, join, sql } from 'sql'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import { TeamMemberRole } from 'store/enums'
import mapTeamMember from 'store/mappers/mapTeamMember'
import { team, teamMember } from 'store/names'
import TeamMember from 'store/types/TeamMember'
import TeamMemberRoleGql from 'api/types/TeamMemberRole'
import createMutation from '../createMutation'

type Args = {
  userId: Id
  pid: Pid
  role?: TeamMemberRoleGql
}

export default createMutation<Args, undefined | TeamMember>(
  'updateTeamMemberByPidAndUserId',
  async (args, { db }) => {
    const updateSqlParts: Sql[] = []

    if (args.role !== undefined) {
      updateSqlParts.push(
        sql`${teamMember.roleId} = ${TeamMemberRole[args.role]}`
      )
    }

    const whereSql = sql`
      where exists (
        select 1
        from ${teamMember} self
        join ${team}
        on self.${teamMember.teamId} = ${team}.${team.id}
        where self.${teamMember.roleId} = ${TeamMemberRole.administrator}
        and self.${teamMember.userId} = ${args.userId}
        and ${team}.${team.id} = ${teamMember}.${teamMember.teamId}
      )
      and ${teamMember}.${teamMember.pid} = ${args.pid}
    `

    const selectSql = sql`
      select
        ${teamMember}.${teamMember.id},
        ${teamMember}.${teamMember.pid},
        ${teamMember}.${teamMember.createdAt},
        ${teamMember}.${teamMember.creatorId},
        ${teamMember}.${teamMember.updatedAt},
        ${teamMember}.${teamMember.updaterId},
        ${teamMember}.${teamMember.teamId},
        ${teamMember}.${teamMember.userId},
        ${teamMember}.${teamMember.roleId}
      from ${teamMember}
      ${whereSql}
      limit 1
    `

    if (updateSqlParts.length > 0) {
      const updateSql = join(updateSqlParts, '\n,          ')

      await db.command(
        sql`
          update ${teamMember}
          set
            ${teamMember.updatedAt} = now() at time zone 'utc',
            ${teamMember.updaterId} = ${args.userId},
            ${updateSql}
          ${whereSql};
        `
      )
    }

    const result = await db.first(selectSql, mapTeamMember)

    return result
  }
)
