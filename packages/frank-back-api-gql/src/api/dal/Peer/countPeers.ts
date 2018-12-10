import { sql, where } from 'sql'
import { peer } from 'store/names'
import createQuery from '../createQuery'
import PeerWhere from './helpers/PeerWhere'
import peerPredicateSql from './helpers/peerPredicateSql'

export type Args = {
  where: PeerWhere
}

export default createQuery<Args, number>('countPeers', (args, { db }) =>
  db.scalar(
    sql`
      select count(*)
      from "${peer}" p
      ${where(peerPredicateSql('p', args.where))}
    `
  )
)
