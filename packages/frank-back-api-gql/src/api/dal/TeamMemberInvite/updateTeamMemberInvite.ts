import { sql, where } from 'sql'
import { teamMemberInvite } from 'store/names'
import Id from 'store/types/Id'
import Date from 'store/types/Date'
import createQuery from '../createQuery'

export type Args = {
  teamMemberInviteId: Id
  usedAt: Date
  userId: Id
}

export default createQuery<Args, undefined | null | Id>(
  'updateTeamMemberInvite',
  async (args, { db }) => {
    const inviteId = await db.scalar<Id>(
      sql`
            update "${teamMemberInvite}"
            set ${teamMemberInvite.userId} = ${args.userId}, ${
        teamMemberInvite.usedAt
      } = ${args.usedAt}
            where "${teamMemberInvite.id}" = ${args.teamMemberInviteId}
            returning "${teamMemberInvite.id}"
          `
    )

    return inviteId
  }
)
