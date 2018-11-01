import { MigrationContext } from './1539027458982_t_payment.migration'
import {
  account,
  category,
  payment,
  peer,
} from './1539027458982_t_payment.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(payment, true)
        .column(t => t.data, 'jsonb')
        .column(t => t.postedOn, 'timestamp not null')
        .column(t => t.amount, 'decimal(20, 10) not null')
        .column(t => t.peerName, 'varchar(256)')
        .column(t => t.description, 'text')
        .column(t => t.accountId, 'bigint not null')
        .column(t => t.categoryId, 'bigint')
        .column(t => t.peerId, 'bigint'),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.accountId)
        .referencing(account)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.categoryId)
        .referencing(category)
        .column(t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.peerId)
        .referencing(peer)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(payment))
}
