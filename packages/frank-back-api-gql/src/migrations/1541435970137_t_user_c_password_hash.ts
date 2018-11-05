import { sql } from 'sql'
import hashPassword from 'utils/hashPassword'
import { MigrationContext } from './1541435970137_t_user_c_password_hash.migration'
import { user } from './1541435970137_t_user_c_password_hash.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x =>
    x.alter.table(user).addColumn(t => t.passwordHash, 'varchar(512)')
  )

  const userIds = await db.scalars(
    sql`
      select ${user.id}
      from ${user};
    `
  )

  for (const id of userIds) {
    const hash = hashPassword('123')

    await db.command(
      sql`
        update "${user}"
        set "${user.passwordHash}" = ${hash}
        where "${user.id}" = ${id};
      `
    )
  }

  await ddl(x =>
    x.alter.table(user).alterColumn(t => t.passwordHash, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).dropColumn(t => t.passwordHash))
}
