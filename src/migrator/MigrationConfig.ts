import MigrationContext from './MigrationContext'

type MigrationConfig = {
  id: number
  name: string
  up: (context: MigrationContext) => Promise<void>
  down: (context: MigrationContext) => Promise<void>
}

export default MigrationConfig
