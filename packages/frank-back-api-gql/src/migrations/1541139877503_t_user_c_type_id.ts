import { raw, sql } from 'sql'
import { MigrationContext } from './1541139877503_t_user_c_type_id.migration'
import { UserType } from './1541139877503_t_user_c_type_id.enums'
import { user, userType } from './1541139877503_t_user_c_type_id.names'

export const up = async ({ db, ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(user).addColumn(t => t.typeId, `bigint`))

  await db.command(
    sql`
      update "${user}"
      set "${user.typeId}" = ${UserType.person};
    `
  )

  await ddl(
    x => x.alter.table(user).alterColumn(t => t.typeId, 'set not null'),
    x =>
      x.create
        .foreignKey()
        .on(user)
        .column(t => t.typeId)
        .referencing(userType)
        .column(t => t.id)
  )

  // email constraint/index

  await ddl(x => x.alter.table(user).alterColumn(t => t.email, 'drop not null'))

  await db.command(
    sql`
      alter table "${user}"
      add constraint "rq:${user}(${user.email})"
      check (
        1 = case "${user.typeId}"
          when ${raw(UserType.person)} then (
            case when "${user.email}" is null then 0 else 1 end
          )
          else 1
        end
      )
    `
  )

  await db.command(
    sql`
      alter table "${user}"
      add constraint "uq:${user}(${user.email})"
      exclude ("${user.email}" with =)
      where ("${user.typeId}" in ( ${raw(UserType.person)} ));
    `
  )

  // firstName constraint/index

  await ddl(x =>
    x.alter.table(user).alterColumn(t => t.firstName, 'drop not null')
  )

  await db.command(
    sql`
      alter table "${user}"
      add constraint "rq:${user}(${user.firstName})"
      check (
        1 = case "${user.typeId}"
          when ${raw(UserType.person)} then (
            case when "${user.firstName}" is null then 0 else 1 end
          )
          else 1
        end
      )
    `
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.drop.constraint(sql`rq:${user}(${user.firstName})`).on(user),
    x => x.drop.constraint(sql`rq:${user}(${user.email})`).on(user),
    x => x.drop.constraint(sql`uq:${user}(${user.email})`).on(user),
    x => x.alter.table(user).alterColumn(t => t.email, 'set not null'),
    x => x.alter.table(user).dropColumn(t => t.typeId)
  )
}
