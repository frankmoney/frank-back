import { sql } from 'sql'
import { source } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  id: Id
  accountId: Id
}

export default createMutation<Args, null | Id>(
  'updateSource',
  async (args, { db }) =>
    db.scalar(
      sql`
      update "${source}"
      set "${source.accountId}" = ${args.accountId}
      where "${source.id}" = ${args.id}
      returning "${source.id}";
    `
    )
)
