import { sql, and } from 'sql'
import { payment } from 'store/names'
import Date from 'store/types/Date'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import paymentPredicateSql from './helpers/paymentPredicateSql'
import PaymentWhere from './helpers/PaymentWhere'

export type Args = {
  id: Id
  includeSelf: boolean
  where?: PaymentWhere
}

const includeSelfSql = (includeSelf: boolean) =>
  includeSelf ? undefined : sql`p."${payment.id}" <> o."${payment.id}"`

export default createQuery<Args, null | Date[]>(
  'getSimilarPaymentDateRangeById',
  (args, { db }) =>
    db.first(
      sql`
        select
          min(p.${payment.postedOn}) "postedOnMin",
          max(p.${payment.postedOn}) "postedOnMax"
        from ${payment} p
        join "${payment}" o
        on p."${payment.categoryId}" = o."${payment.categoryId}"
        and p."${payment.peerId}" = o."${payment.peerId}"
        ${and(includeSelfSql(args.includeSelf))}
        where o."${payment.id}" = ${args.id}
        ${and(paymentPredicateSql('p', args.where))};
      `,
      x =>
        x && x.postedOnMin && x.postedOnMax
          ? [x.postedOnMin, x.postedOnMax]
          : null
    )
)
