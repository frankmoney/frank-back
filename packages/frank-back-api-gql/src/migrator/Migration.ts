import Database from 'store/Database'

type Migration = {
  id: number
  name: string
  up: (context: { db: Database }) => Promise<void>
  down: (context: { db: Database }) => Promise<void>
}

export default Migration
