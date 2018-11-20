import { MigrationContext } from './1542693472087_t_payment_c_published_drop.migration'
import { payment as paymentPrevious } from './1542693472087_t_payment_c_published_drop.previousNames'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(paymentPrevious).dropColumn(t => t.published))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter
      .table(paymentPrevious)
      .addColumn(t => t.published, 'boolean not null default false')
  )
}
