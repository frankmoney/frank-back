import { Sql, literal, sql } from 'sql'
import { passwordReset } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import PasswordResetWhere from './PasswordResetWhere'

const passwordResetPredicateSql = (
  alias: string | Sql,
  where: undefined | null | PasswordResetWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${passwordReset.id}"`, where.id),
    createWhereSql(
      sql`"${alias$}"."${passwordReset.createdAt}"`,
      where.createdAt
    ),
    createWhereSql(sql`"${alias$}"."${passwordReset.usedAt}"`, where.usedAt),
    createWhereSql(sql`"${alias$}"."${passwordReset.token}"`, where.token),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => passwordResetPredicateSql(alias, x)))
    } else {
      branches.push(passwordResetPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => passwordResetPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, passwordResetPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default passwordResetPredicateSql
