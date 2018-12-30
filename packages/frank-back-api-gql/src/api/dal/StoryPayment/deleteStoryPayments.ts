import { sql } from 'sql'
import { storyPayment } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  storyId: Id
}

export default createMutation<Args, number>(
  'deleteStoryPayments',
  (args, { db }) =>
    db.command(
      sql`
      delete from "${storyPayment}"
      where "${storyPayment.storyId}" = ${args.storyId}
    `
    )
)
