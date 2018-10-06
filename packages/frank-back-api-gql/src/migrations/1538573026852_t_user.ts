import { MigrationContext } from './1538573026852_t_user.migration'
import { user } from './1538573026852_t_user.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create
      .table(user, true)
      .column(t => t.email, 'varchar(256) not null')
      .column(t => t.lastName, 'varchar(256)')
      .column(t => t.firstName, 'varchar(256) not null')
      .column(t => t.avatar, 'jsonb')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(user))
}
