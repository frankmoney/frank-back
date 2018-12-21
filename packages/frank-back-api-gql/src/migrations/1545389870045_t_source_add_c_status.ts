import { sql } from 'sql'
import { MigrationContext } from './1545389870045_t_source_add_c_status.migration'
import { SourceStatus } from './1545389870045_t_source_add_c_status.enums'
import { source } from './1545389870045_t_source_add_c_status.names'

export const up = async ({ ddl, db }: MigrationContext) => {
  await ddl(x => x.alter.table(source).addColumn(t => t.status, `varchar(32)`))

  await db.command(
    sql`update ${source} set ${source.status} = ${SourceStatus.active}`
  )

  await ddl(x =>
    x.alter.table(source).alterColumn(t => t.status, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(source).dropColumn(t => t.status))
}
