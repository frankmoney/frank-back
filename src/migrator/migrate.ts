/* tslint:disable:no-console */
import fs from 'fs-extra'
import path from 'path'
import { Pool, PoolConfig } from 'pg'
import * as R from 'ramda'
import Connection from 'dal/Connection'
import Transaction from 'dal/Transaction'
import { sql } from 'sql'
import Migration from './Migration'
import MigrationContext from './MigrationContext'
import loadMigration from './loadMigration'

type Args = {
  databaseConfig: PoolConfig
  to?: string
}

const getMigrators = (migrations: Migration[], to: string, current: number) => {
  if (to === 0) {
    migrations.sort((a, b) => b.id - a.id)
    to = migrations[0].id
  } else if (to < 0) {
    migrations.sort((a, b) => a.id - b.id)
    to = migrations[-to].id
  }

  const result: [Migration, (context: MigrationContext) => Promise<void>][] = []

  if (to !== current) {
    if (to < current) {
      for (const migration of migrations) {
        if (migration.id >= to && migration.id <= current) {
          result.push([migration, migration.down])
        }
      }
    } else {
      for (const migration of migrations) {
        if (migration.id >= current && migration.id <= to) {
          result.push([migration, migration.up])
        }
      }
    }
  }

  return result
}

const executeMigrator = async (
  transaction: Transaction,
  migration: Migration,
  migrator: (context: MigrationContext) => Promise<void>
) => {
  migrator.call(migration, { db: transaction })
}

const migrate = async ({ databaseConfig, to }: Args) => {
  console.log(' INFO to:', to)

  const pool = new Pool(databaseConfig)

  try {
    const connection = new Connection(pool)
    await connection.open()

    try {
      // init storage
      await connection.command(sql`
        create table if not exists "t_migration_history" (
          "id" bigint PRIMARY KEY NOT NULL,
          "name" varchar NOT NULL
        );


        create unique index if not exists "uq_name"
        on t_migration_history ( "name" );
      `)

      // get list of applied migrations
      const appliedMigrations =
        await connection.query<{ id: number, name: string }>(
          sql`select "id", "name" from "t_migration_history"`
        )

      // get list of existing migrations
      const existingMigrations: Migration[] = []

      if (fs.existsSync(path.join('src', 'migrations'))) {
        for (const entry of await fs.readdir(path.join('src', 'migrations'))) {
          const stat = await fs.stat(path.join('src', 'migrations', entry))
          if (stat.isFile() && /^[0-9]+_.+?\.ts$/.test(entry)) {
            if (entry.substr(entry.length - 14) !== '.descriptor.ts') {
              const migration = loadMigration(path.join('migrations', entry))
              existingMigrations.push(migration)
            }
          }
        }
      }

      existingMigrations.sort((a, b) => a.id - b.id)

      const last = R.last(existingMigrations.map(x => x.id)) || 0

      if (last > 0) {
        if (!R.find(x => x.id === last, existingMigrations)) {
          const lastName = R.last(existingMigrations)!.name
          throw new Error(`Could not find matching code for last applied migration ${last} "${lastName}"`)
        }
      }

      let target: number
      if (to === undefined) {
        target = R.last(existingMigrations.map(x => x.id)) || 0
      } else if (/^[0-9]$/.test(to)) {
        target = Number(to)
      } else if (/^+[0-9]+$/.test(to)) {
        if (Number(to.substr(1)) === 0) {
          console.log(' INFO nothing to do')
          return
        }

        let lastIndex: number = existingMigrations.length
        for (const [migration, index] of <[Migration, number][]>existingMigrations.map((x, i) => [x, i])) {
          if (migration.id >= last) {
            lastIndex = index - 1
            break
          }
        }
        const targetMigration = existingMigrations[lastIndex + Number(to.substr(1))] || R.last(existingMigrations)
        target = targetMigration.id
        if (target <= last) {
          console.log(' INFO nothing to do')
          return
        }
      } else if (/^-[0-9]+$/.test(to)) {
        if (Number(to.substr(1)) === 0) {
          console.log(' INFO nothing to do')
          return
        }

        for (const [migration, index] of <[Migration, number][]>existingMigrations.map((x, i) => [x, i])) {
          if (migration.id >= last) {

          }
        }
      }



      if (existingMigrations.length === 0) {
        if (to === undefined || to > )
      }

      const {
        existingMigrations,
        missingAppliedMigrations,
        missingExistingMigrations,
      } = await validate(appliedMigrations)

      for (const { id, name } of missingAppliedMigrations) {
        console.error(`ERROR ${id} "${name}" not applied to database`)
      }

      for (const { id, name } of missingExistingMigrations) {
        console.warn(` WARN ${id} "${name}" applied migration does not exist`)
      }

      if (missingAppliedMigrations.length > 0) {
        return process.exit(1)
      }

      appliedMigrations.sort((a, b) => b.id - a.id)
      const current = appliedMigrations[0] ? appliedMigrations[0].id : -Infinity

      if (to === undefined) {
        to = +Infinity
      }

      const migrators = getMigrators(existingMigrations, to, current)

      if (migrators.length === 0) {
        console.log(' INFO nothing to do')
      }

      for (const [migration, migrator] of migrators) {
        const transaction = await connection.beginTransaction()

        try {
          if (migrator === migration.up) {
            console.log(` INFO ${migration.id} "${migration.name}" - applying to database`)
          } else if (migrator === migration.down) {
            console.log(` INFO ${migration.id} "${migration.name}" - rolling back`)
          }

          await executeMigrator(transaction, migration, migrator)

          if (migrator === migration.up) {
            await transaction.command(sql`
              insert "t_migration_history" ( "id", "name" )
              values ( ${migration.id}, ${migration.name} )
            `)
          } else if (migrator === migration.down) {
            await transaction.command(sql`
              delete from "t_migration_history"
              where "id" = ${migration.id}
            `)
          }

          await transaction.commit()
        } catch (exc) {
          try {
            await transaction.rollback()
          } catch (exc2) {
            console.error(`Failed to rollback transaction:\r\n${exc2}`)
          }
          throw exc
        }
      }
    } finally {
      await connection.close()
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

export default migrate
