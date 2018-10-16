import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'

export type Args = {
  accountId: Id
  pid: Pid
}

export default createQuery<Args, Peer>(
  'getPeerByPidAndAccountId',
  (args, { db }) =>
    db.first(
      sql`
      select
        ${peer}.${peer.id},
        ${peer}.${peer.pid},
        ${peer}.${peer.createdAt},
        ${peer}.${peer.creatorId},
        ${peer}.${peer.updatedAt},
        ${peer}.${peer.updaterId},
        ${peer}.${peer.name},
        ${peer}.${peer.accountId}
      from ${peer}
      where ${peer.accountId} = ${args.accountId}
      and ${peer.id} = ${args.pid};
    `,
      mapPeer
    )
)
