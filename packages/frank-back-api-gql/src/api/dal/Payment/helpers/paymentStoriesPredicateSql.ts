import { Sql, and, join, sql, literal } from 'sql'
import { payment, story, storyPayment } from 'store/names'
import storyPredicateSql from '../../Story/helpers/storyPredicateSql'
import conjunction from '../../helpers/conjunction'
import disjunction from '../../helpers/disjunction'
import PaymentStoriesWhere from './PaymentStoriesWhere'

const paymentStoriesPredicateSql = (
  alias: string | Sql,
  where: undefined | null | PaymentStoriesWhere
): undefined | Sql => {
  if (!where) {
    return undefined
  }

  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias
  const paymentStoriesAlias$: Sql = sql`${alias$}.stories`
  const storiesAlias$: Sql = sql`${paymentStoriesAlias$}.story`

  const branches: (undefined | Sql)[] = []

  if (where.empty !== undefined) {
    branches.push(
      join(
        [
          where.empty === true ? sql`not` : undefined,
          sql`exists (`,
          sql`select 1`,
          sql`from "${storyPayment}" "${paymentStoriesAlias$}"`,
          sql`join "${story}" "${storiesAlias$}"`,
          sql`on "${paymentStoriesAlias$}"."${storyPayment.storyId}"`,
          sql`= "${storiesAlias$}"."${story.id}"`,
          sql`where "${alias$}"."${payment.id}"`,
          sql`= "${paymentStoriesAlias$}"."${storyPayment.paymentId}"`,
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
          sql`from "${storyPayment}" "${paymentStoriesAlias$}"`,
          sql`join "${story}" "${storiesAlias$}"`,
          sql`on "${paymentStoriesAlias$}"."${storyPayment.storyId}"`,
          sql`= "${storiesAlias$}"."${story.id}"`,
          sql`where "${alias$}"."${payment.id}"`,
          sql`= "${paymentStoriesAlias$}"."${storyPayment.paymentId}"`,
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
          sql`from "${storyPayment}" "${paymentStoriesAlias$}"`,
          sql`join "${story}" "${storiesAlias$}"`,
          sql`on "${paymentStoriesAlias$}"."${storyPayment.storyId}"`,
          sql`= "${storiesAlias$}"."${story.id}"`,
          sql`where "${alias$}"."${payment.id}"`,
          sql`= "${paymentStoriesAlias$}"."${storyPayment.paymentId}"`,
          and(storyPredicateSql(storiesAlias$, where.any)),
          sql`)`,
        ],
        ' '
      )
    )
  }

  if (where.and) {
    if (Array.isArray(where.and)) {
      branches.push(...where.and.map(x => paymentStoriesPredicateSql(alias, x)))
    } else {
      branches.push(paymentStoriesPredicateSql(alias, where.and))
    }
  }

  const junction = conjunction(...branches)

  if (where.or) {
    if (Array.isArray(where.or)) {
      return disjunction(
        junction,
        ...where.or.map(x => paymentStoriesPredicateSql(alias, x))
      )
    } else {
      return disjunction(junction, paymentStoriesPredicateSql(alias, where.or))
    }
  } else {
    return junction
  }
}

export default paymentStoriesPredicateSql
