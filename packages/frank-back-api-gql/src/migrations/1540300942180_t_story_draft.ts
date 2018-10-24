import { MigrationContext } from './1540300942180_t_story_draft.migration'
import { story, storyDraft } from './1540300942180_t_story_draft.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.create
      .table(storyDraft)
      .column(t => t.publishedAt, 'timestamp')
      .column(t => t.title, 'varchar(256)')
      .column(t => t.cover, 'jsonb')
      .column(t => t.body, 'jsonb')
      .column(t => t.storyId, 'bigint not null'),
    x => x.alter
      .table(storyDraft)
      .addForeignKey()
      .column(t => t.storyId)
      .to(story)
      .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.drop
      .table(storyDraft)
  )
}
