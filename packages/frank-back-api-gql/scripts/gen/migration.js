/* tslint:disable:no-console */
const escapeStringRegexp = require('escape-string-regexp')
const fs = require('fs-extra')
const path = require('path')
const R = require('ramda')

const rootDir = path.join(__dirname, '..', '..')

const srcDir = path.join(rootDir, 'src')

const targetDir = path.join('src', 'migrations')

const enumsSource = path.join(srcDir, 'store', 'enums.ts')

const namesSource = path.join(srcDir, 'store', 'names.ts')

const migrationFileRx = /^([0-9]+)_([^.]+?)\.ts$/i

const importPrefix = path.relative(targetDir, srcDir) || '.'

const template = what => {
  const replace = async (name, args) => {
    const filename = path.join(srcDir, 'migrator', 'templates', name)
    let text = await fs.readFile(filename, { encoding: 'utf-8' })

    for (const key of Object.keys(args)) {
      const value = args[key]
      text = text.replace(
        new RegExp(escapeStringRegexp(`%%${key}%%`), 'g'),
        value
      )
    }

    return text
  }

  switch (what.name) {
    case 'main':
      return replace('main.ts.template', {
        IMPORTS: what.args.imports.join('\n'),
      })
    case 'migration':
      return replace('migration.ts.template', {
        ID: `${what.args.id}`,
        NAME: what.args.name,
      })
  }
}

const mainTemplate = imports => template({ name: 'main', args: { imports } })

const migrationTemplate = ({ id, name }) =>
  template({ name: 'migration', args: { id, name } })

const createMigrationInfo = (id, name) => ({
  id,
  name,
  files: {
    migrators: `${id}_${name}.ts`,
    migration: `${id}_${name}.migration.ts`,
    enums: `${id}_${name}.enums.ts`,
    names: `${id}_${name}.names.ts`,
    previousNames: `${id}_${name}.previousNames.ts`,
  },
})

const clean = async filename => {
  try {
    await fs.unlink(filename)
  } catch (exc) {
    console.error(`Failed to clean file ${filename}`)
    console.error(exc)
  }
}

module.exports = async (name, id) => {
  const migration = createMigrationInfo(id || Date.now(), name)

  await fs.ensureDir(targetDir)

  const existingFiles = await fs.readdir(path.join('src', 'migrations'))
  const existingFilesSet = new Set(existingFiles)

  const existingMigrations = existingFiles
    .map(x => migrationFileRx.exec(x))
    .map(x => x && createMigrationInfo(x[1], x[2]))
    .filter(x => x && existingFilesSet.has(x.files.migration))

  const uniqueTestMatches = existingMigrations.filter(
    x => x.name === migration.name
  )

  if (uniqueTestMatches.length > 0) {
    const matches = uniqueTestMatches
      .map(x => `\r\n- ${x.files.migrators}`)
      .join('')
    throw new Error(
      `migration "${name}" conflicts with existing migrations:${matches}`
    )
  }

  existingMigrations.sort((a, b) => a.id - b.id)
  const lastMigration = R.last(existingMigrations)
  const lastMigrationNamesSource =
    lastMigration && path.join(targetDir, lastMigration.files.names)

  const namesExist = fs.existsSync(namesSource)
  const previousNamesExist =
    lastMigrationNamesSource && fs.existsSync(lastMigrationNamesSource)

  const mainPath = path.resolve(
    '.',
    path.join(targetDir, migration.files.migrators)
  )
  const migrationPath = path.resolve(
    '.',
    path.join(targetDir, migration.files.migration)
  )
  const enumsPath = path.join(targetDir, migration.files.enums)
  const namesPath = path.join(targetDir, migration.files.names)
  const previousNamesPath = path.join(targetDir, migration.files.previousNames)

  const imports = [
    `import { sql } from 'sql'`,
    `import { MigrationContext } from './${migration.files.migration.substr(
      0,
      migration.files.migration.length - 3
    )}'`,
    `import * as enums from './${migration.files.enums.substr(
      0,
      migration.files.enums.length - 3
    )}'`,
  ]

  if (namesExist) {
    imports.push(
      `import * as names from './${migration.files.names.substr(
        0,
        migration.files.names.length - 3
      )}'`
    )
  }

  if (previousNamesExist) {
    imports.push(
      `import * as previousNames from './${migration.files.previousNames.substr(
        0,
        migration.files.previousNames.length - 3
      )}'`
    )
  }

  await fs.writeFile(mainPath, await mainTemplate(imports), {
    encoding: 'utf8',
  })

  try {
    console.log(`created file ${mainPath}`)

    await fs.writeFile(migrationPath, await migrationTemplate(migration), {
      encoding: 'utf8',
    })

    try {
      console.log(`created file ${migrationPath}`)

      await fs.copy(enumsSource, enumsPath, { preserveTimestamps: true })

      try {
        console.log(`created file ${enumsPath}`)

        if (namesExist) {
          await fs.copy(namesSource, namesPath, { preserveTimestamps: true })
        }

        try {
          if (namesExist) {
            console.log(`created file ${namesPath}`)
          }

          if (previousNamesExist) {
            await fs.copy(lastMigrationNamesSource, previousNamesPath, {
              preserveTimestamps: true,
            })
          }

          try {
            if (previousNamesExist) {
              console.log(`created file ${previousNamesPath}`)
            }
          } catch (exc) {
            if (previousNamesExist) {
              await clean(previousNamesPath)
            }
            throw exc
          }
        } catch (exc) {
          if (namesExist) {
            await clean(namesPath)
          }
          throw exc
        }
      } catch (exc) {
        await clean(enumsPath)
        throw exc
      }
    } catch (exc) {
      await clean(migrationPath)
      throw exc
    }
  } catch (exc) {
    await clean(mainPath)
    throw exc
  }
}
