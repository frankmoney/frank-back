import MigrationContext from './MigrationContext'

const createMigrator = (migrate: (context: MigrationContext) => Promise<void>) => migrate

export default createMigrator
