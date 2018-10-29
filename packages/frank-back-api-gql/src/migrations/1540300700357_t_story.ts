import { MigrationContext } from './1540300700357_t_story.migration'
import { account, story } from './1540300700357_t_story.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(story, true)
        .column(t => t.publishedAt, 'timestamp')
        .column(t => t.title, 'varchar(256)')
        .column(t => t.cover, 'jsonb')
        .column(t => t.body, 'jsonb')
        .column(t => t.accountId, 'bigint not null'),
    x =>
      x.alter
        .table(story)
        .addForeignKey()
        .column(t => t.accountId)
        .to(account)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(story))
}
