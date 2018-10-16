import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { payment, peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'

export type Args = {
  paymentId: Id
}

export default createQuery<Args, Peer>('getPeerByPaymentId', (args, { db }) =>
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
      join ${payment}
      on ${peer}.${peer.id} = ${payment}.${payment.peerId}
      where ${payment}.${payment.id} = ${args.paymentId};
    `,
    mapPeer
  )
)
