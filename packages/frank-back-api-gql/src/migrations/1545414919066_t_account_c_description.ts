import { MigrationContext } from './1545414919066_t_account_c_description.migration'
import { account } from './1545414919066_t_account_c_description.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).addColumn(t => t.description, 'text'))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).dropColumn(t => t.description))
}
