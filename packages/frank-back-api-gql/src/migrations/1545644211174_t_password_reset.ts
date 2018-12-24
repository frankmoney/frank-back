import { MigrationContext } from './1545644211174_t_password_reset.migration'
import { passwordReset, user } from './1545644211174_t_password_reset.names'

export const up = async ({ ddl }: MigrationContext) => {
  const idSeqName = `sq:${passwordReset}(${passwordReset.id})`
  await ddl(
    x => x.create.sequence(idSeqName),
    x =>
      x.create
        .table(passwordReset)
        .column(t => t.id, `bigint not null default nextval('${idSeqName}')`)
        .column(t => t.token, 'uuid not null')
        .column(
          t => t.createdAt,
          `timestamp not null default (now() at time zone 'utc')`
        )
        .column(t => t.updatedAt, 'timestamp')
        .column(t => t.usedAt, 'timestamp')
        .column(t => t.userId, 'bigint not null'),
    x => x.alter.sequence(idSeqName).ownedBy(passwordReset, t => t.id),
    x =>
      x.create
        .foreignKey()
        .on(passwordReset)
        .column(t => t.userId)
        .referencing(user)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(passwordReset))
}
