import { sql } from 'sql'
import { user } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  id: Id
  salt: string
  hash: string
}

export default createMutation<Args, Id>(
  'updateUserPasswordById',
  (args, { db }) =>
    db.scalar(
      sql`
        update "${user}"
        set
          "${user.passwordSalt}" = ${args.salt},
          "${user.passwordHash}" = ${args.hash}
        where "${user.id}" = ${args.id}
        returning "${user.id}";
      `
    )
)
