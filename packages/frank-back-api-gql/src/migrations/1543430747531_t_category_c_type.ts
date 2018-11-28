import { sql } from 'sql'
import { MigrationContext } from './1543430747531_t_category_c_type.migration'
import { CategoryType } from './1543430747531_t_category_c_type.enums'
import { category } from './1543430747531_t_category_c_type.names'

export const up = async ({ ddl, db }: MigrationContext) => {
  await ddl(x => x.alter.table(category).addColumn(t => t.type, `varchar(32)`))

  await db.command(
    sql`update ${category} set ${category.type} = ${CategoryType.spending}`
  )

  await ddl(x =>
    x.alter.table(category).alterColumn(t => t.type, 'set not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(category).dropColumn(t => t.type))
}
