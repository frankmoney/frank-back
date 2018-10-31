import { MigrationContext } from './1539027257850_t_category.migration'
import { account, category } from './1539027257850_t_category.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(category, true)
        .column(t => t.name, 'varchar(128) not null')
        .column(t => t.color, 'varchar(32) not null')
        .column(t => t.accountId, 'bigint not null'),
    x =>
      x.create
        .foreignKey()
        .on(category)
        .column(t => t.accountId)
        .referencing(account)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(category))
}
