import Database from 'store/Database'
import Migration from './Migration'

const applyMigration = async (
  db: Database,
  migration: Migration,
  action: 'up' | 'down'
) => {
  if (action === 'up') {
    await migration.up({ db })
  } else {
    await migration.down({ db })
  }
}

export default applyMigration
