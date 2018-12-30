import { Sql, literal, sql } from 'sql'
import { source } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import SourceWhere from './SourceWhere'
import sourceAccountPredicateSql from './sourceAccountPredicateSql'

const sourcePredicateSql = (
  alias: string | Sql,
  where: undefined | null | SourceWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${source.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${source.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${source.name}"`, where.name),
    sourceAccountPredicateSql(alias$, where.account),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => sourcePredicateSql(alias, x)))
    } else {
      branches.push(sourcePredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => sourcePredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, sourcePredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default sourcePredicateSql
