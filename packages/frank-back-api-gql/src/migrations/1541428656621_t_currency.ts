import { sql } from 'sql'
import { MigrationContext } from './1541428656621_t_currency.migration'
import { CurrencyCode } from './1541428656621_t_currency.enums'
import { currency } from './1541428656621_t_currency.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(
    x => x.create.table(currency).column(t => t.code, 'char(4) not null'),
    x =>
      x.create
        .constraint()
        .on(currency)
        .column(t => t.code)
        .primaryKey()
  )

  await db.command(
    sql`
      insert into
        ${currency} (
          ${currency.code}
        )
      values
        ( ${CurrencyCode.usd} ),
        ( ${CurrencyCode.eur} ),
        ( ${CurrencyCode.rub} );
    `
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(currency))
}
