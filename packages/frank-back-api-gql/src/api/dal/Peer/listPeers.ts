import { limit, sql, where } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { peer } from 'store/names'
import Peer from 'store/types/Peer'
import PeersOrder from 'store/types/PeersOrder'
import createQuery from '../createQuery'
import PeerWhere from './helpers/PeerWhere'
import peerFieldsSql from './helpers/peerFieldsSql'
import peerOrderBySql from './helpers/peerOrderBySql'
import peerPredicateSql from './helpers/peerPredicateSql'

export type Args = {
  where?: PeerWhere
  take?: number
  skip?: number
  orderBy: PeersOrder
}

export default createQuery<Args, Peer[]>('listPeers', (args, { db }) =>
  db.query(
    sql`
      select ${peerFieldsSql('p')}
      from "${peer}" p
      ${where(peerPredicateSql('p', args.where))}
      order by ${peerOrderBySql('p', args.orderBy)}
      ${limit({ take: args.take, skip: args.skip })};
    `,
    mapPeer
  )
)
