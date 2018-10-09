import { MigrationContext } from './1539024561489_t_account.migration'
import { account, team } from './1539024561489_t_account.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(account, true)
        .column(t => t.data, 'jsonb')
        .column(t => t.name, 'varchar(256) not null')
        .column(t => t.teamId, 'bigint not null'),
    x =>
      x.alter
        .table(account)
        .addForeignKey()
        .column(t => t.teamId)
        .to(team)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(account))
}
