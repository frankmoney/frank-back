import { MigrationContext } from './1540929183467_peer_add_unique.migration'
import * as names from './1540929183467_peer_add_unique.names'

export const up = async ({ ddl }: MigrationContext) => {

  await ddl(
    x =>
      x.alter
        .table(names.peer)
        .addUniqueConstraint()
        .column(t => t.accountId)
        .column(t => t.name),
  )

}

export const down = async ({ ddl }: MigrationContext) => {
  // ?
}
