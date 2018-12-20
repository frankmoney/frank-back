import { Sql, and, join, sql, literal } from 'sql'
import { account, story } from 'store/names'
import storyPredicateSql from '../../Story/helpers/storyPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import AccountStoriesWhere from './AccountStoriesWhere'

const accountStoriesPredicateSql = (
  alias: string | Sql,
  where: undefined | null | AccountStoriesWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const storiesAlias$: Sql = sql`${alias$}.stories`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${story}" "${storiesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${storiesAlias$}"."${story.accountId}"`,
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
          sql`from "${story}" "${storiesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${storiesAlias$}"."${story.accountId}"`,
          and(storyPredicateSql(storiesAlias$, where.any)),
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
          sql`from "${story}" "${storiesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${storiesAlias$}"."${story.accountId}"`,
          and(storyPredicateSql(storiesAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => accountStoriesPredicateSql(alias, x)))
    } else {
      branches.push(accountStoriesPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => accountStoriesPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, accountStoriesPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default accountStoriesPredicateSql
