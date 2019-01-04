import newid from 'uuid/v4'
import { sql } from 'sql'
import { teamMemberInvite } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  creatorId: Id
  teamId: Id
  email: string
  note: null | string
  roleId: Id
}

export default createMutation<Args, Id>(
  'createTeamMemberInvite',
  (args, { db }) =>
    db.scalar<Id>(
      sql`
      insert into
        "${teamMemberInvite}" (
          "${teamMemberInvite.token}",
          "${teamMemberInvite.creatorId}",
          "${teamMemberInvite.email}",
          "${teamMemberInvite.note}",
          "${teamMemberInvite.teamId}",
          "${teamMemberInvite.roleId}"
        )
      values
        (
          ${newid()},
          ${args.creatorId},
          ${args.email},
          ${args.note},
          ${args.teamId},
          ${args.roleId}
        )
      returning
        "${teamMemberInvite.id}"
    `
    )
)
