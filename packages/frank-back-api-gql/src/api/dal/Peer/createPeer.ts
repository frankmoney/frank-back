import R from 'ramda'
import { join, sql } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  accountId: Id
  name: string
}

export default createMutation<Args, Peer>(
  'createPeer',
  async (args, { db }) => {
    const columns = [peer.accountId, peer.name]

    const values = [args.accountId, args.name]

    return await db.first(
      sql`
        insert into ${peer} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${peer.id},
          ${peer.pid},
          ${peer.accountId},
          ${peer.name}
      `,
      mapPeer
    )
  }
)
