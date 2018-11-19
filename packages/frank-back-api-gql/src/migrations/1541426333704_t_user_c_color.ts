import { sql } from 'sql'
import { MigrationContext } from './1541426333704_t_user_c_color.migration'
import { user } from './1541426333704_t_user_c_color.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).addColumn(t => t.color, 'smallint'))

  await db.command(
    sql`
      update "${user}"
      set "${user.color}" = (
        select floor(random() * 10) + 1
        where "${user.id}" = "${user.id}"
      );
    `
  )

  await ddl(x => x.alter.table(user).alterColumn(t => t.color, 'set not null'))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).dropColumn(t => t.color))
}
