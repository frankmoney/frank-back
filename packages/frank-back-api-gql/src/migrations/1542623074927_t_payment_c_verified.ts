import { sql } from 'sql'
import { MigrationContext } from './1542623074927_t_payment_c_verified.migration'
import { payment } from './1542623074927_t_payment_c_verified.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).addColumn(t => t.verified, 'boolean'))

  await db.command(
    sql`
      update ${payment}
      set ${payment.verified} = false;
    `
  )

  await ddl(x =>
    x.alter.table(payment).alterColumn(t => t.verified, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).dropColumn(t => t.verified))
}
