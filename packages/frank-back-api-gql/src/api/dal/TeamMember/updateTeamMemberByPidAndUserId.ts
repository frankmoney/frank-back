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

    if (updateSqlParts.length === 0) {
      return undefined
    }

    const updateSql = join(updateSqlParts, '\n,          ')

    const result = await db.first(
      sql`
        update ${teamMember}
        set ${updateSql}
        from ${teamMember} self
        join ${team}
        on self.${teamMember.teamId} = ${team}.${team.id}
        where ${team}.${team.id} = ${teamMember}.${teamMember.teamId}
        and self.${teamMember.roleId} = ${TeamMemberRole.administrator}
        and self.${teamMember.userId} = ${args.userId}
        and ${teamMember}.${teamMember.pid} = ${args.pid}
        returning
          ${teamMember}.${teamMember.id},
          ${teamMember}.${teamMember.pid},
          ${teamMember}.${teamMember.createdAt},
          ${teamMember}.${teamMember.creatorId},
          ${teamMember}.${teamMember.updatedAt},
          ${teamMember}.${teamMember.updaterId},
          ${teamMember}.${teamMember.teamId},
          ${teamMember}.${teamMember.userId},
          ${teamMember}.${teamMember.roleId};
      `,
      mapTeamMember
    )

    return result
  }
)
