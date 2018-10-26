import { sql } from 'sql'
import { MigrationContext } from './1540556647227_update_payment.migration'
import * as enums from './1540556647227_update_payment.enums'
import * as names from './1540556647227_update_payment.names'
import * as previousNames from './1540556647227_update_payment.previousNames'

export const up = async ({ ddl, db }: MigrationContext) => {

  // add column
  await db.command(
    sql.unparameterized`
      alter table ${names.payment}
      add ${names.payment.published} boolean not null default false;
    `,
  )

}

export const down = async ({ ddl, db }: MigrationContext) => {

  // add column
  await db.command(
    sql.unparameterized`
      alter table ${names.payment}
      drop column ${names.payment.published};
    `,
  )

}
