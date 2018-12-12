import { Sql, join, literal, sql } from 'sql'
import { account, category } from 'store/names'
import AccountWhere from '../../Account/helpers/AccountWhere'
import accountPredicateSql from '../../Account/helpers/accountPredicateSql'

const categoryAccountPredicateSql = (
  alias: string | Sql,
  where: undefined | null | AccountWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const accountAlias$: Sql = sql`${alias$}.account`

  const accountWhereSql = accountPredicateSql(accountAlias$, where)

  if (!accountWhereSql) {
    return undefined
  }

  return join(
    [
      sql`exists (`,
      sql`select 1`,
      sql`from "${account}" "${accountAlias$}"`,
      sql`where "${alias$}"."${category.accountId}"`,
      sql`= "${accountAlias$}"."${account.id}"`,
      sql`and ${accountWhereSql}`,
      sql`)`,
    ],
    ' '
  )
}

export default categoryAccountPredicateSql
