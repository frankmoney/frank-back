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
      x.create
        .foreignKey()
        .on(account)
        .column(t => t.teamId)
        .referencing(team)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(account))
}
