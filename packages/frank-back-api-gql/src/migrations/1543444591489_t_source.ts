import { MigrationContext } from './1543444591489_t_source.migration'
import { account, source } from './1543444591489_t_source.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(source, true)
        .column(t => t.data, 'jsonb')
        .column(t => t.name, 'varchar(256) not null')
        .column(t => t.currencyCode, 'varchar(4) not null')
        .column(t => t.accountId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(source)
        .column(t => t.accountId)
        .to(account)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(source))
}
