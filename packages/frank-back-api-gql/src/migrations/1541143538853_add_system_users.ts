import { sql } from 'sql'
import { MigrationContext } from './1541143538853_add_system_users.migration'
import {
  SystemUserName,
  UserType,
} from './1541143538853_add_system_users.enums'
import { user } from './1541143538853_add_system_users.names'

export const up = async ({ db }: MigrationContext) => {
  await db.command(sql`
    insert into
      "${user}" (
        "${user.creatorId}",
        "${user.typeId}",
        "${user.name}"
      )
    values
      ( 0, ${UserType.system}, ${SystemUserName.migration} ),
      ( 0, ${UserType.system}, ${SystemUserName.system} ),
      ( 0, ${UserType.system}, ${SystemUserName.import} );
  `)

  const migrationUserId = await db.scalar(
    sql`
      select "${user.id}"
      from "${user}"
      where "${user.typeId}" = ${UserType.system}
      and "${user.name}" = ${SystemUserName.migration};
    `
  )

  await db.command(
    sql`
      update "${user}"
      set "${user.creatorId}" = ${migrationUserId}
      where "${user.typeId}" = ${UserType.system}
      and "${user.name}" in (
        ${SystemUserName.migration},
        ${SystemUserName.system},
        ${SystemUserName.import}
      );
    `
  )
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(
    sql`
      delete from "${user}"
      where "${user.typeId}" = ${UserType.system}
      and "${user.name}" in (
        ${SystemUserName.migration},
        ${SystemUserName.system},
        ${SystemUserName.import}
      );
    `
  )
}
