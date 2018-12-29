import { join, sql } from 'sql'
import { storyPayment } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  storyId: Id
  paymentIds: Id[]
}

const mergeStoryPayments = createMutation<Args>(
  'mergeStoryPayments',
  async (args, { db }) => {
    await db.command(
      sql`
        delete from "${storyPayment}"
        where "${storyPayment.storyId}" = ${args.storyId}
      `
    )

    if (args.paymentIds.length) {
      const valuesSqls = args.paymentIds.map(
        x => sql`( ${args.userId}, ${args.storyId}, ${x} )`
      )

      await db.command(
        sql`
          insert into
            ${storyPayment} (
              ${storyPayment.creatorId},
              ${storyPayment.storyId},
              ${storyPayment.paymentId}
            )
          values
            ${join(valuesSqls, ', ')}
        `
      )
    }
  }
)

export default mergeStoryPayments
