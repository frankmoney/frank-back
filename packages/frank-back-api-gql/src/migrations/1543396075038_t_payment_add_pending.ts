import { MigrationContext } from './1543396075038_t_payment_add_pending.migration'
import { payment } from './1543396075038_t_payment_add_pending.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter
      .table(payment)
      .addColumn(t => t.pending, 'boolean not null default false')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).dropColumn(t => t.pending))
}
