import MigrationContext from './MigrationContext'

type Migration = {
  id: number
  name: string
  up: (context: MigrationContext) => Promise<void>
  down: (context: MigrationContext) => Promise<void>
}

export default Migration
