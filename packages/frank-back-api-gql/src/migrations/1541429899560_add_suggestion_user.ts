import { sql } from 'sql'
import { MigrationContext } from './1541429899560_add_suggestion_user.migration'
import {
  SystemUserName,
  UserType,
} from './1541429899560_add_suggestion_user.enums'
import { user } from './1541429899560_add_suggestion_user.names'

export const up = async ({ db }: MigrationContext) => {
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
      insert into
        "${user}" (
          "${user.creatorId}",
          "${user.typeId}",
          "${user.name}",
          "${user.color}"
        )
      values
        (
          ${migrationUserId},
          ${UserType.system},
          ${SystemUserName.suggestion},
          floor(random() * 10) + 1
        );
    `
  )
}

export const down = async ({ db }: MigrationContext) => {
  await db.command(
    sql`
      delete from "${user}"
      where "${user.typeId}" = ${UserType.system}
      and "${user.name}" = ${SystemUserName.suggestion};
    `
  )
}
