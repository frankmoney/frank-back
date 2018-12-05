import { MigrationContext } from './1543584609243_t_team_c_city.migration'
import { team } from './1543584609243_t_team_c_city.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(team).addColumn(t => t.city, 'varchar(256)'))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(team).dropColumn(t => t.city))
}
