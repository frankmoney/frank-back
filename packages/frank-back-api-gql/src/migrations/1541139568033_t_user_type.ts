import { sql } from 'sql'
import { MigrationContext } from './1541139568033_t_user_type.migration'
import { UserType } from './1541139568033_t_user_type.enums'
import { userType } from './1541139568033_t_user_type.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(
    x =>
      x.create
        .table(userType)
        .column(t => t.id, `bigint not null`)
        .column(
          t => t.createdAt,
          `timestamp not null default (now() at time zone 'utc')`
        )
        .column(t => t.name, `varchar(128) not null`),
    x =>
      x.create
        .constraint()
        .on(userType)
        .column(t => t.id)
        .primaryKey()
  )

  await db.command(sql`
    insert into
      "${userType}" (
        "${userType.id}",
        "${userType.name}"
      )
    values
      ( ${UserType.system}, ${UserType[UserType.system]} ),
      ( ${UserType.person}, ${UserType[UserType.person]} );
  `)
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(userType))
}
