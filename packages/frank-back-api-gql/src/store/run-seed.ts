/* tslint:disable:no-console */
import { Pool } from 'pg'
import config from 'config'
import Database from './Database'
import seed from './seed'

const databaseConfig = config.DATABASE

const main = async () => {
  const pool = new Pool(databaseConfig)

  try {
    const db = new Database(pool, databaseConfig)
    await db.open()

    try {
      await db.begin()

      try {
        console.log('starting seed')
        await seed({ db })
        await db.commit()
        console.log('seed finished')
      } catch (exc) {
        try {
          await db.rollback()
        } catch (exc2) {
          console.error(`Failed to rollback transaction:\r\n${exc2}`)
        }
        throw exc
      }
    } finally {
      db.close()
    }
  } catch (exc) {
    console.error(`Fatal error:\r\n${exc.stack}`)
    process.exit(1)
  } finally {
    try {
      await pool.end()
    } catch (exc) {
      console.warn(`Failed to clean up pool:\r\n${exc}`)
    }
  }
}

main()
