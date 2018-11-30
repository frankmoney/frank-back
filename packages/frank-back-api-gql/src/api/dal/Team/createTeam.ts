import { sql } from 'sql'
import { SystemUserId } from 'store/enums'
import { team } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  name: string
  city: null | string
  size: null | string
}

export default createMutation<Args, Id>(
  'createTeam',
  async (args, { db }) =>
    await db.scalar<Id>(
      sql`
        insert into
          "${team}" (
            "${team.creatorId}",
            "${team.name}",
            "${team.city}",
            "${team.size}"
          )
        values
          (
            ${SystemUserId.system},
            ${args.name},
            ${args.city},
            ${args.size}
          )
        returning
          "${team.id}"
      `
    )
)
