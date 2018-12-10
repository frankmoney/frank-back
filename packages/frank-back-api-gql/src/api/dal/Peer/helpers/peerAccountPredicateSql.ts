import { Sql, join, literal, sql } from 'sql'
import { account, peer } from 'store/names'
import accountPredicateSql from '../../Account/helpers/accountPredicateSql'
import AccountWhere from '../../Account/helpers/AccountWhere'

const peerAccountPredicateSql = (
  alias: string | Sql,
  where?: AccountWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const accountAlias$: Sql = sql`${alias$}.account`

  const accountWhereSql = accountPredicateSql(accountAlias$)

  if (!accountWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${account}" "${accountAlias$}"`,
      sql`where "${alias$}"."${peer.accountId}"`,
      sql`= "${accountAlias$}"."${account.id}"`,
      sql`and ${accountWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default peerAccountPredicateSql
