import { Sql, and, join, sql, literal } from 'sql'
import { account, team } from 'store/names'
import accountPredicateSql from '../../Account/helpers/accountPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import TeamAccountsWhere from './TeamAccountsWhere'

const teamAccountsPredicateSql = (
  alias: string | Sql,
  where: undefined | null | TeamAccountsWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias
  const accountsAlias$: Sql = sql`${alias$}.accounts`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${account}" "${accountsAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${accountsAlias$}"."${account.teamId}"`,
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
          sql`from "${account}" "${accountsAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${accountsAlias$}"."${account.teamId}"`,
          and(accountPredicateSql(accountsAlias$, where.any)),
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
          sql`from "${account}" "${accountsAlias$}"`,
          sql`where "${alias$}"."${team.id}"`,
          sql`= "${accountsAlias$}"."${account.teamId}"`,
          and(accountPredicateSql(accountsAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => teamAccountsPredicateSql(alias, x)))
    } else {
      branches.push(teamAccountsPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => teamAccountsPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, teamAccountsPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default teamAccountsPredicateSql
