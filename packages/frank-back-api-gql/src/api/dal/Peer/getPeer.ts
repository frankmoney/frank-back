import { sql, where } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { peer } from 'store/names'
import Peer from 'store/types/Peer'
import createQuery from '../createQuery'
import PeerWhere from './helpers/PeerWhere'
import peerFieldsSql from './helpers/peerFieldsSql'
import peerPredicateSql from './helpers/peerPredicateSql'

export type Args = {
  where?: PeerWhere
}

export default createQuery<Args, Peer>('getPeer', (args, { db }) =>
  db.first(
    sql`
      select ${peerFieldsSql('p')}
      from "${peer}" p
      ${where(peerPredicateSql('p', args.where))}
      limit 1
    `,
    mapPeer
  )
)
