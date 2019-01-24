import { MigrationContext } from './1548057309170_t_account_c_demo.migration'
import {account} from './1548057309170_t_account_c_demo.names'

export const up = async ({ ddl }: MigrationContext) => {

  await ddl(x => x.alter.table(account).addColumn(t => t.demo, `boolean not null default false`))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).dropColumn(t => t.demo))
}
