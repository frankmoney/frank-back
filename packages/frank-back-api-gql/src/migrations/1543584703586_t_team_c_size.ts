import { MigrationContext } from './1543584703586_t_team_c_size.migration'
import { team } from './1543584703586_t_team_c_size.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(team).addColumn(t => t.size, 'varchar(128)'))
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(team).dropColumn(t => t.size))
}
