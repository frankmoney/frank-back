import { MigrationContext } from './1538361391910_t_user.migration'
import { t_user } from './1538361391910_t_user.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create
      .table(t_user, true)
      .column(t => t.c_email, 'varchar(256) not null')
      .column(t => t.c_last_name, 'varchar(256)')
      .column(t => t.c_first_name, 'varchar(256) not null')
      .column(t => t.c_avatar, 'jsonb')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(t_user))
}
