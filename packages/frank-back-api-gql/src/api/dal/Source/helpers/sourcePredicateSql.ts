import { Sql, literal, sql } from 'sql'
import { category } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import SourceWhere from './SourceWhere'
import sourceAccountPredicateSql from './sourceAccountPredicateSql'

const categoryPredicateSql = (
  alias: string | Sql,
  where: undefined | null | SourceWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${category.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${category.pid}"`, where.pid),
    createWhereSql(sql`"${alias$}"."${category.name}"`, where.name),
    sourceAccountPredicateSql(alias$, where.account),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => categoryPredicateSql(alias, x)))
    } else {
      branches.push(categoryPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => categoryPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, categoryPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default categoryPredicateSql