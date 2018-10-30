import R from 'ramda'
import { join, sql } from 'sql'
import { peer } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  accountId: Id
  name: string
}

export default createMutation<Args, Id>(
  'findOrCreatePeer',
  async (args, { db }) => {
    const existingPeerId = await db.scalar(
      sql`
        select ${peer.id}
        from ${peer}
        where ${peer}.${peer.accountId} = ${args.accountId}
        and ${peer}.${peer.name} = ${args.name}
      `
    )

    if (existingPeerId) {
      return existingPeerId
    }

    const columns = [peer.accountId, peer.name]
    const values = [args.accountId, args.name]

    return await db.scalar(
      sql`
        insert into ${peer} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${peer.id}
      `
    )
  }
)
