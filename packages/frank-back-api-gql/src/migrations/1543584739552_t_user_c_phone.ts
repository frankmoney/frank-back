import { MigrationContext } from './1543584739552_t_user_c_phone.migration'
import { user } from './1543584739552_t_user_c_phone.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.alter
      .table(user)
      .addColumn(t => t.phone, 'varchar(32)')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.alter
      .table(user)
      .dropColumn(t => t.phone)
  )
}
