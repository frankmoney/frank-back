import MigrationConfig from 'migrator/MigrationConfig'

const createMigration = ({ id, name, up, down }: MigrationConfig) => ({
  id,
  name,
  up,
  down,
})

export default createMigration
