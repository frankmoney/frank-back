import { MigrationContext } from './1545224926730_t_source_update_c_account_id.migration'
import { source } from './1545224926730_t_source_update_c_account_id.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter.table(source).alterColumn(t => t.accountId, 'drop not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter.table(source).alterColumn(t => t.accountId, 'set not null')
  )
}
