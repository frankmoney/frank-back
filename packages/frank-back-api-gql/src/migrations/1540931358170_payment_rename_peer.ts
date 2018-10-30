import { sql } from 'sql'
import { MigrationContext } from './1540931358170_payment_rename_peer.migration'
import * as enums from './1540931358170_payment_rename_peer.enums'
import * as names from './1540931358170_payment_rename_peer.names'
import * as previousNames from './1540931358170_payment_rename_peer.previousNames'

export const up = async ({ db }: MigrationContext) => {
  // rename column
  await db.command(
    sql.unparameterized`
      alter table ${names.payment}
      rename column ${previousNames.payment.peerName} to ${
      names.payment.rawPeerName
    };
    `
  )
}

export const down = async ({ db }: MigrationContext) => {
  // rename column
  await db.command(
    sql.unparameterized`
      alter table ${names.payment}
      rename column ${names.payment.rawPeerName} to ${
      previousNames.payment.peerName
    };
    `
  )
}
