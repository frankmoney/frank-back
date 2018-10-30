import { sql } from 'sql'
import { MigrationContext } from './1540928558011_payment_add_description_index.migration'
import * as names from './1540928558011_payment_add_description_index.names'

const INDEX_NAME = `ix:${names.payment}(${names.payment.description})`

export const up = async ({ db }: MigrationContext) => {
  await db.command(
    sql.unparameterized`
      create index "${INDEX_NAME}" 
      on ${names.payment} (${names.payment.description});
    `
  )
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(
    sql.unparameterized`
      drop index "${INDEX_NAME}";
    `
  )
}
