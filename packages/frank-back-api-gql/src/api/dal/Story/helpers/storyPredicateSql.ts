import { Sql, literal, sql } from 'sql'
import { story } from 'store/names'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import storyAccountPredicateSql from './storyAccountPredicateSql'
import StoryWhere from './StoryWhere'

const storyPredicateSql = (
  alias: string | Sql,
  where: undefined | null | StoryWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const branches: (undefined | Sql)[] = [
    createWhereSql(sql`"${alias$}"."${story.id}"`, where.id),
    createWhereSql(sql`"${alias$}"."${story.pid}"`, where.pid),
    storyAccountPredicateSql(alias$, where.account),
  ]

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => storyPredicateSql(alias, x)))
    } else {
      branches.push(storyPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => storyPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, storyPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default storyPredicateSql
