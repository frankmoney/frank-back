import { Sql, and, join, sql, literal } from 'sql'
import { account, category } from 'store/names'
import categoryPredicateSql from '../../Category/helpers/categoryPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import AccountCategoriesWhere from './AccountCategoriesWhere'

const accountCategoriesPredicateSql = (
  alias: string | Sql,
  where: undefined | null | AccountCategoriesWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const categoriesAlias$: Sql = sql`${alias$}.categories`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${category}" "${categoriesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${categoriesAlias$}"."${category.accountId}"`,
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
          sql`from "${category}" "${categoriesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${categoriesAlias$}"."${category.accountId}"`,
          and(categoryPredicateSql(categoriesAlias$, where.any)),
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
          sql`from "${category}" "${categoriesAlias$}"`,
          sql`where "${alias$}"."${account.id}"`,
          sql`= "${categoriesAlias$}"."${category.accountId}"`,
          and(categoryPredicateSql(categoriesAlias$, where.none)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(
        ...where.and.map(x => accountCategoriesPredicateSql(alias, x))
      )
    } else {
      branches.push(accountCategoriesPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => accountCategoriesPredicateSql(alias, x))
      )
    } else {
      return disjunction(
        junction,
        accountCategoriesPredicateSql(alias, where.or)
      )
    }
  } else {
    return junction
  }
}

export default accountCategoriesPredicateSql
