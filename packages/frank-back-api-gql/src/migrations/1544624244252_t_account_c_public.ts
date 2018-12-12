import { sql } from 'sql'
import { MigrationContext } from './1544624244252_t_account_c_public.migration'
import { account } from './1544624244252_t_account_c_public.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).addColumn(t => t.public, 'boolean'))

  await db.command(
    sql`
      update "${account}"
      set "${account.public}" = false;
    `
  )

  await ddl(x =>
    x.alter.table(account).alterColumn(t => t.public, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).dropColumn(t => t.public))
}
