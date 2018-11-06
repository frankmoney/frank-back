import { sql } from 'sql'
import { MigrationContext } from './1541157919558_update_payment.migration'
import { payment, user } from './1541157919558_update_payment.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.alter.table(payment).addColumn(t => t.descriptionUpdaterId, `bigint`),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.descriptionUpdaterId)
        .referencing(user)
        .column(t => t.id)
  )

  await ddl(
    x => x.alter.table(payment).addColumn(t => t.peerUpdaterId, `bigint`),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.peerUpdaterId)
        .referencing(user)
        .column(t => t.id)
  )

  await ddl(
    x => x.alter.table(payment).addColumn(t => t.categoryUpdaterId, `bigint`),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.categoryUpdaterId)
        .referencing(user)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).dropColumn(t => t.descriptionUpdaterId))

  await ddl(x => x.alter.table(payment).dropColumn(t => t.peerUpdaterId))

  await ddl(x => x.alter.table(payment).dropColumn(t => t.categoryUpdaterId))
}
