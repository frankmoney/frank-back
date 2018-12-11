import { Sql, join, literal, sql } from 'sql'
import { payment, peer } from 'store/names'
import PeerWhere from '../../Peer/helpers/PeerWhere'
import peerPredicateSql from '../../Peer/helpers/peerPredicateSql'

const paymentPeerPredicateSql = (
  alias: string | Sql,
  where?: PeerWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const peerAlias$: Sql = sql`${alias$}.peer`

  const peerWhereSql = peerPredicateSql(peerAlias$)

  if (!peerWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${peer}" "${peerAlias$}"`,
      sql`where "${alias$}"."${payment.peerId}"`,
      sql`= "${peerAlias$}"."${peer.id}"`,
      sql`and ${peerWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default paymentPeerPredicateSql
