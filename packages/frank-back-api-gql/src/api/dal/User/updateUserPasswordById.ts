import { sql } from 'sql'
import { user } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  id: Id
  hash: string
}

export default createMutation<Args, Id>(
  'updateUserPasswordById',
  (args, { db }) =>
    db.scalar(
      sql`
        update "${user}"
        set
          "${user.updatedAt}" = now() at time zone 'utc',
          "${user.updaterId}" = ${args.id},
          "${user.passwordHash}" = ${args.hash}
        where "${user.id}" = ${args.id}
        returning "${user.id}";
      `
    )
)
