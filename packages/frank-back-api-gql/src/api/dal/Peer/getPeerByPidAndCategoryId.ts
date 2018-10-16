import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { payment, peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'

export type Args = {
  categoryId: Id
  pid: Pid
}

export default createQuery<Args, Peer>(
  'getPeerByPidAndCategoryId',
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
      where exists (
        select 1
        from ${payment}
        where ${payment}.${payment.peerId} = ${peer}.${peer.id}
        and ${payment}.${payment.categoryId} = ${args.categoryId}
      )
      and ${peer.id} = ${args.pid};
    `,
      mapPeer
    )
)
