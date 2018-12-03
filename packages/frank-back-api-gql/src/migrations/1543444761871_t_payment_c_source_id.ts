import { MigrationContext } from './1543444761871_t_payment_c_source_id.migration'
import { payment, source } from './1543444761871_t_payment_c_source_id.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.alter.table(payment).addColumn(t => t.sourceId, 'bigint'),
    x =>
      x.create
        .foreignKey()
        .on(payment)
        .column(t => t.sourceId)
        .to(source)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).dropColumn(t => t.sourceId))
}
