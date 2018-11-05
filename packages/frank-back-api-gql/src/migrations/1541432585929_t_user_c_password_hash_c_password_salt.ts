import { sql } from 'sql'
import createPasswordSalt from 'utils/createPasswordSalt'
import hashPassword from '../utils/hashPassword'
import { MigrationContext } from './1541432585929_t_user_c_password_hash_c_password_salt.migration'
import { user } from './1541432585929_t_user_c_password_hash_c_password_salt.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(
    x => x.alter.table(user).addColumn(t => t.passwordSalt, 'varchar(2048)'),
    x => x.alter.table(user).addColumn(t => t.passwordHash, 'varchar(2048)')
  )

  const userIds = await db.scalars<number>(
    sql`
      select "${user.id}"
      from "${user}";
    `
  )

  for (const userId of userIds) {
    const salt = await createPasswordSalt()
    const hash = await hashPassword('123', salt)

    await db.command(
      sql`
        update "${user}"
        set
          "${user.passwordSalt}" = ${salt},
          "${user.passwordHash}" = ${hash}
        where "${user.id}" = ${userId};
      `
    )
  }

  await ddl(
    x => x.alter.table(user).alterColumn(t => t.passwordSalt, 'set not null'),
    x => x.alter.table(user).alterColumn(t => t.passwordHash, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.alter.table(user).dropColumn(t => t.passwordHash),
    x => x.alter.table(user).dropColumn(t => t.passwordSalt)
  )
}
