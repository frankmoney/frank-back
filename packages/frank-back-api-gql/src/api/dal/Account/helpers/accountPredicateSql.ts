import { Sql, literal, sql } from 'sql'
import { account } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import AccountWhere from './AccountWhere'

const accountPredicateSql = (
  alias: string | Sql,
  where?: AccountWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${account.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${account.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${account.name}"`, where.name),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => accountPredicateSql(alias, x)))
    } else {
      branches.push(accountPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => accountPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, accountPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default accountPredicateSql
