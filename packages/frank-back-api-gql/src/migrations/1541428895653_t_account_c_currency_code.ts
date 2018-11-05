import { sql } from 'sql'
import { MigrationContext } from './1541428895653_t_account_c_currency_code.migration'
import { CurrencyCode } from './1541428895653_t_account_c_currency_code.enums'
import { account } from './1541428895653_t_account_c_currency_code.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter.table(account).addColumn(t => t.currencyCode, 'char(4)')
  )

  await db.command(
    sql`
      update ${account}
      set ${account.currencyCode} = ${CurrencyCode.usd};
    `
  )

  await ddl(x =>
    x.alter.table(account).alterColumn(t => t.currencyCode, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(account).dropColumn(t => t.currencyCode))
}
