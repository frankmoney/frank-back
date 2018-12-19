import { MigrationContext } from './1545221795898_t_onboarding_c_source.migration'
import { onboarding, source } from './1545221795898_t_onboarding_c_source.names'

export const up = async ({ ddl }: MigrationContext) => {
  await ddl(
    x => x.alter.table(onboarding).addColumn(t => t.sourceId, 'bigint'),
    x =>
      x.create
        .foreignKey()
        .on(onboarding)
        .column(t => t.sourceId)
        .to(source)
        .column(t => t.id)
  )
}

export const down = async ({ ddl }: MigrationContext) => {
  await ddl(x => x.alter.table(onboarding).dropColumn(t => t.sourceId))
}
