import { Sql, and, join, sql, literal } from 'sql'
import { account, peer } from 'store/names'
import peerPredicateSql from '../../Peer/helpers/peerPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import AccountPeersWhere from './AccountPeersWhere'

const accountPeersPredicateSql = (
  alias: string | Sql,
  where: undefined | null | AccountPeersWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const peersAlias$: Sql = sql`${alias$}.peers`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${peer}" "${peersAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${peersAlias$}"."${peer.accountId}"`,
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.any) {
    branches.push(
      join(
        [
          sql`exists (`,
          sql`select 1`,
          sql`from "${peer}" "${peersAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${peersAlias$}"."${peer.accountId}"`,
          and(peerPredicateSql(peersAlias$, where.any)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.none) {
    branches.push(
      join(
        [
          sql`not exists (`,
          sql`select 1`,
          sql`from "${peer}" "${peersAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${peersAlias$}"."${peer.accountId}"`,
          and(peerPredicateSql(peersAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => accountPeersPredicateSql(alias, x)))
    } else {
      branches.push(accountPeersPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => accountPeersPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, accountPeersPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default accountPeersPredicateSql
