import { sql } from 'sql'
import { CategoryType } from 'store/enums'
import { category } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

type Args = {
  userId: Id
  accountId: Id
  type: CategoryType
  name: string
  color: string
}

export default createMutation<Args, Id>(
  'createCategory',
  async (args, { db }) =>
    await db.scalar<Id>(
      sql`
      insert into
        "${category}" (
          "${category.creatorId}",
          "${category.accountId}",
          "${category.type}",
          "${category.name}",
          "${category.color}"
        )
      values
        (
          ${args.userId},
          ${args.accountId},
          ${args.type},
          ${args.name},
          ${args.color}
        )
      returning "${category.id}"
    `
    )
)
