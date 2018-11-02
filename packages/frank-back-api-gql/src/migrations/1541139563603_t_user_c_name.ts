import { sql } from 'sql'
import { MigrationContext } from './1541139563603_t_user_c_name.migration'
import { user } from './1541139563603_t_user_c_name.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).addColumn(t => t.name, `varchar(512)`))

  await db.command(
    sql`
      update ${user}
      set ${user.name} = ${user.email};
    `
  )

  await ddl(
    x =>
      x.create
        .constraint()
        .on(user)
        .column(t => t.name)
        .unique(),
    x => x.alter.table(user).alterColumn(t => t.name, `set not null`)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).dropColumn(t => t.name))
}
