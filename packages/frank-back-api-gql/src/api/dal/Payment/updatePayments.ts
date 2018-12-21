import { sql, where } from 'sql'
import { payment } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  userId: Id
  update: {
    verified?: boolean
    categoryId?: null | Id
  }
  where?: PaymentWhere
}

export default createMutation<Args, undefined | null | Id[]>(
  'updatePayments',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        verified: payment.verified,
        categoryId: payment.categoryId,
        updatedAt: payment.updatedAt,
        updaterId: payment.updaterId,
      },
      types: {
        verified: 'boolean',
        categoryId: 'bigint',
      },
    })

    const paymentIds = setSql
      ? await db.scalars<Id>(
          sql`
            update "${payment}"
            set ${setSql}
            where "${payment.id}" in (
              select p."${payment.id}"
              from "${payment}" p
              ${where(paymentPredicateSql('p', args.where))}
            )
            returning "${payment.id}"
          `
        )
      : undefined

    return paymentIds
  }
)
