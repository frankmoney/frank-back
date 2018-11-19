import { sql } from 'sql'
import { user } from 'store/names'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import createMutation from '../createMutation'

export type Args = {
  id: Id
  avatar: null | Json
}

export default createMutation<Args, null | Id>(
  'updateUserAvatarById',
  async (args, { db }) =>
    db.scalar(
      sql`
      update "${user}"
      set "${user.avatar}" = ${args.avatar}
      where "${user.id}" = ${args.id}
      returning "${user.id}";
    `
    )
)
