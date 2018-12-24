import newid from 'uuid/v4'
import { sql } from 'sql'
import { passwordReset } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  userId: Id
}

export default createMutation<Args, string>(
  'createPasswordReset',
  (args, { db }) =>
    db.scalar(
      sql`
      insert into
        "${passwordReset}" (
          "${passwordReset.token}",
          "${passwordReset.userId}"
        )
      values
        (
          ${newid()},
          ${args.userId}
        )
      returning
        "${passwordReset.token}"
    `
    )
)
