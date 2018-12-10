import { Sql, literal, sql } from 'sql'
import { peer } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import PeerWhere from './PeerWhere'
import peerAccountPredicateSql from './peerAccountPredicateSql'
import peerPaymentsPredicateSql from './peerPaymentsPredicateSql'

const peerPredicateSql = (
  alias: string | Sql,
  where?: PeerWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${peer.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${peer.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${peer.name}"`, where.name),
    peerAccountPredicateSql(alias$, where && where.account),
    peerPaymentsPredicateSql(alias, where && where.payments),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => peerPredicateSql(alias, x)))
    } else {
      branches.push(peerPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => peerPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, peerPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default peerPredicateSql
