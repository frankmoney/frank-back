/* tslint:disable:no-console */
import fs from 'fs-extra'
import path from 'path'
import { Pool, PoolConfig } from 'pg'
import * as R from 'ramda'
import { sql } from 'sql'
import Database from 'store/Database'
import Migration from './Migration'
import applyMigration from './applyMigration'
import loadMigration from './loadMigration'

type Args = {
  databaseConfig: PoolConfig & { setRole?: string }
  to?: string
}

const migrate = async ({ databaseConfig, to }: Args) => {
  const pool = new Pool(databaseConfig)

  try {
    const db = new Database(pool, databaseConfig)
    await db.open()

    try {
      // init storage
      await db.command(sql`
        create table if not exists "t_migration_history" (
          "id" bigint PRIMARY KEY NOT NULL,
          "name" varchar NOT NULL
        );

        create unique index if not exists "uq_name"
        on "t_migration_history" ( "name" );
      `)

      // get list of applied migrations
      const appliedMigrations = await db.query<{ id: number; name: string }>(
        sql`select "id", "name" from "t_migration_history"`
      )

      // get list of existing migrations
      const existingMigrations: Migration[] = []

      if (fs.existsSync(path.join('src', 'migrations'))) {
        const entries = new Set(
          await fs.readdir(path.join('src', 'migrations'))
        )
        for (const entry of entries) {
          if (
            entries.has(entry.substr(0, entry.length - 3) + '.migration.ts')
          ) {
            const filename = path.join('src', 'migrations', entry)
            const filepath = path.resolve(__dirname, '..', '..', filename)
            const migration = loadMigration(filepath)
            existingMigrations.push(migration)
          }
        }
      }

      const currentAppliedMigration = R.last(appliedMigrations) || {
        id: 0,
        name: '<INIT>',
      }

      let currentExistingMigration = R.find(
        x => x.id === currentAppliedMigration.id,
        existingMigrations
      )
      if (!currentExistingMigration) {
        currentExistingMigration = {
          ...currentAppliedMigration,
          up: () => Promise.resolve(),
          down: () => Promise.resolve(),
        }
        existingMigrations.push(currentExistingMigration)
      }

      // sort existing migrations by id
      existingMigrations.sort((a, b) => a.id - b.id)

      let targetExistingMigration: undefined | Migration
      if (to === undefined) {
        targetExistingMigration = R.last(existingMigrations)!
      } else if (/^[0-9]+$/.test(to)) {
        const id = Number(to)
        targetExistingMigration = R.find(x => x.id === id, existingMigrations)
        if (!targetExistingMigration) {
          targetExistingMigration = {
            id,
            name: '<TARGET>',
            up: () => Promise.resolve(),
            down: () => Promise.resolve(),
          }
          existingMigrations.push(targetExistingMigration)
        }
      } else if (/^\+[0-9]+$/.test(to)) {
        const inc = Number(to.substr(1))
        const currentExistingMigrationIndex = existingMigrations.indexOf(
          currentExistingMigration
        )
        const targetExistingMigrationIndex = currentExistingMigrationIndex + inc
        targetExistingMigration =
          existingMigrations[targetExistingMigrationIndex]
        if (!targetExistingMigration) {
          targetExistingMigration = R.last(existingMigrations)!
        }
      } else if (/^-[0-9]+$/.test(to)) {
        const dec = Number(to.substr(1))
        const currentExistingMigrationIndex = existingMigrations.indexOf(
          currentExistingMigration
        )
        const targetExistingMigrationIndex = currentExistingMigrationIndex - dec
        targetExistingMigration =
          existingMigrations[targetExistingMigrationIndex]
        if (!targetExistingMigration) {
          targetExistingMigration = existingMigrations[0]
        }
      } else {
        throw new Error(`Invalid "to" argument format: ${to}`)
      }

      // sort existing migrations by id
      existingMigrations.sort((a, b) => a.id - b.id)

      if (currentExistingMigration.id === targetExistingMigration.id) {
        console.log(' INFO nothing to do')
      } else {
        if (currentExistingMigration.id < targetExistingMigration.id) {
          const currentExistingMigrationIndex = existingMigrations.indexOf(
            currentExistingMigration
          )
          const targetExistingMigrationIndex = existingMigrations.indexOf(
            targetExistingMigration,
            currentExistingMigrationIndex
          )

          for (
            let i = currentExistingMigrationIndex + 1;
            i <= targetExistingMigrationIndex;
            ++i
          ) {
            const migration = existingMigrations[i]

            try {
              console.log(` INFO  up  ${migration.id} ${migration.name}...`)

              await db.begin()

              try {
                await applyMigration(db, migration, 'up')

                await db.command(sql`
                  insert into "t_migration_history" ( "id", "name" )
                  values ( ${migration.id}, ${migration.name} );
                `)

                await db.commit()

                console.log(` INFO  up  ${migration.id} ${migration.name} - OK`)
              } catch (exc) {
                try {
                  await db.rollback()
                } catch (exc2) {
                  console.error(`Failed to rollback transaction:\r\n${exc2}`)
                }
                throw exc
              }
            } catch (exc) {
              console.error(`ERROR  up  ${migration.id} ${migration.name}`)
              throw exc
            }
          }
        } else {
          const targetExistingMigrationIndex = existingMigrations.indexOf(
            targetExistingMigration
          )
          const currentExistingMigrationIndex = existingMigrations.indexOf(
            currentExistingMigration,
            targetExistingMigrationIndex
          )

          for (
            let i = currentExistingMigrationIndex;
            i >= targetExistingMigrationIndex;
            --i
          ) {
            const migration = existingMigrations[i]

            try {
              console.log(` INFO down ${migration.id} ${migration.name}...`)

              await db.begin()

              try {
                await applyMigration(db, migration, 'down')

                await db.command(sql`
                  delete from "t_migration_history"
                  where "id" = ${migration.id};
                `)

                await db.commit()

                console.log(` INFO down ${migration.id} ${migration.name} - OK`)
              } catch (exc) {
                try {
                  await db.rollback()
                } catch (exc2) {
                  console.error(`Failed to rollback transaction:\r\n${exc2}`)
                }
                throw exc
              }
            } catch (exc) {
              console.error(`ERROR down ${migration.id} ${migration.name}`)
              throw exc
            }
          }
        }
      }
    } finally {
      await db.close()
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
