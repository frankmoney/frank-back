import { sql } from 'sql'
import { story, storyDraft, storyDraftPayment, storyPayment } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'

export type Args = {
  userId: Id
  id: Id
}

export default createMutation<Args, void>(
  'deleteStoryById',
  async (args, { db }) => {
    await db.command(
      sql`
        delete from ${storyDraftPayment}
        where ${storyDraftPayment.storyDraftId} in (
          select ${storyDraft.id}
          from ${storyDraft}
          where ${storyDraft.storyId} = ${args.id}
        );
      `
    )

    await db.command(
      sql`
        delete from ${storyDraft}
        where ${storyDraft.storyId} = ${args.id};
      `
    )

    await db.command(
      sql`
        delete from ${storyPayment}
        where ${storyPayment.storyId} = ${args.id};
      `
    )

    await db.command(
      sql`
        delete from ${story}
        where ${story.id} = ${args.id};
      `
    )
  }
)
