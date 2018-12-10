import { sql } from 'sql'
import { SystemUserId } from 'store/enums'
import { teamMember } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  teamId: Id
  userId: Id
  roleId: Id
}

export default createMutation<Args, Id>(
  'createTeamMember',
  async (args, { db }) =>
    await db.scalar<Id>(
      sql`
      insert into
        "${teamMember}" (
          "${teamMember.creatorId}",
          "${teamMember.teamId}",
          "${teamMember.userId}",
          "${teamMember.roleId}"
        )
      values
        (
          ${SystemUserId.system},
          ${args.teamId},
          ${args.userId},
          ${args.roleId}
        )
      returning
        "${teamMember.id}"
    `
    )
)
