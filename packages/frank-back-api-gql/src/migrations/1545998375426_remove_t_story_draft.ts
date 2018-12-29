import { MigrationContext } from './1545998375426_remove_t_story_draft.migration'
import { payment, story } from './1545998375426_remove_t_story_draft.names'
import {
  storyDraft,
  storyDraftPayment,
} from './1545998375426_remove_t_story_draft.previousNames'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(storyDraftPayment), x => x.drop.table(storyDraft))
}

export const down = async ({ db, ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(storyDraft, true)
        .column(t => t.publishedAt, 'timestamp')
        .column(t => t.title, 'varchar(256)')
        .column(t => t.cover, 'jsonb')
        .column(t => t.body, 'jsonb')
        .column(t => t.storyId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(storyDraft)
        .column(t => t.storyId)
        .referencing(story)
        .column(t => t.id)
  )

  await ddl(
    x =>
      x.create
        .table(storyDraftPayment, true)
        .column(t => t.storyDraftId, 'bigint not null')
        .column(t => t.paymentId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(storyDraftPayment)
        .column(t => t.storyDraftId)
        .referencing(storyDraft)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(storyDraftPayment)
        .column(t => t.paymentId)
        .referencing(payment)
        .column(t => t.id)
  )
}
