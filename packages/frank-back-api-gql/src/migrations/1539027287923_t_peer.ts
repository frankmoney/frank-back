import { MigrationContext } from './1539027287923_t_peer.migration'
import { account, peer } from './1539027287923_t_peer.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(peer, true)
        .column(t => t.name, 'varchar(256) not null')
        .column(t => t.accountId, 'bigint not null'),
    x =>
      x.alter
        .table(peer)
        .addForeignKey()
        .column(t => t.accountId)
        .to(account)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(peer))
}
