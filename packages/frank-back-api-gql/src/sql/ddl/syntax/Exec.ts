import Database from 'store/Database'

type Exec = (db: Database) => Promise<void>

export default Exec
