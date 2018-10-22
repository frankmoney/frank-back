import { sql } from 'sql'
import { TeamMemberRole } from 'store/enums'
import { teamMember } from 'store/names'
import Id from 'store/types/Id'
import createQuery from '../createQuery'

export type Args = {
  userId: Id
}

export default createQuery<Args, TeamMemberRole>(
  'getTeamMemberRoleByUserId',
  (args, { db }) =>
    db.scalar(
      sql`
        select
          ${teamMember}.${teamMember.roleId}
        from ${teamMember}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        limit 1
      `
    )
)
