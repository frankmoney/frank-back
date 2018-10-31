import { MigrationContext } from './1540997228588_t_payment_c_published.migration'
import { payment } from './1540997228588_t_payment_c_published.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter
      .table(payment)
      .addColumn(t => t.published, 'boolean not null default false')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(payment).dropColumn(t => t.published))
}
