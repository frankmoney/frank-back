import { sql } from 'sql'
import { teamMember } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  userId: Id
}

export default createMutation<Args, number>(
  'deleteTeamMember',
  (args, { db }) =>
    db.command(
      sql`
      delete from "${teamMember}"
      where "${teamMember.userId}" = ${args.userId}
    `
    )
)
