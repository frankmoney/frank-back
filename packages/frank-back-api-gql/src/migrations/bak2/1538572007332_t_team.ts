import { MigrationContext } from './1538572007332_t_team.migration'
import { t_team } from './1538572007332_t_team.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create.table(t_team, true).column(t => t.c_name, 'varchar(512) not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(t_team))
}
