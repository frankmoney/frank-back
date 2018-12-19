import { MigrationContext } from './1545238817042_t_payment_update_c_account_id.migration'
import {payment} from './1545238817042_t_payment_update_c_account_id.names'

export const up = async ({ ddl }: MigrationContext) => {

  await ddl(x =>
    x.alter.table(payment).alterColumn(t => t.accountId, 'drop not null')
  )

}

export const down = async ({ ddl }: MigrationContext) => {


  await ddl(x =>
    x.alter.table(payment).alterColumn(t => t.accountId, 'set not null')
  )

}
