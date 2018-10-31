import { MigrationContext } from './1540967261561_t_payment_ix_description.migration'
import { payment } from './1540967261561_t_payment_ix_description.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create
      .index()
      .on(payment)
      .column(t => t.description)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.drop
      .index()
      .on(payment)
      .column(t => t.description)
  )
}
