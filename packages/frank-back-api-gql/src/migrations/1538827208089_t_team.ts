import { MigrationContext } from './1538827208089_t_team.migration'
import { team } from './1538827208089_t_team.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(x =>
    x.create.table(team, true).column(t => t.name, 'varchar(256) not null')
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.drop.table(team))
}
