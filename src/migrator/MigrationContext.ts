import Transaction from 'dal/Transaction'

type MigrationContext = {
  db: Transaction
}

export default MigrationContext
