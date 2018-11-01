import { sql } from 'sql'
import { MigrationContext } from './1540969083070_peer_add_uniq.migration'
import * as enums from './1540969083070_peer_add_uniq.enums'
import * as names from './1540969083070_peer_add_uniq.names'
import * as previousNames from './1540969083070_peer_add_uniq.previousNames'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create
      .constraint()
      .on(names.peer)
      .column(t => t.accountId)
      .column(t => t.name)
      .unique()
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.drop
      .constraint()
      .on(names.peer)
      .column(t => t.accountId)
      .column(t => t.name)
      .unique()
  )
}
