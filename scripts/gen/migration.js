/* tslint:disable:no-console */
const fs = require('fs-extra')
const path = require('path')

const root = path.relative(path.join('src', 'migrations'), path.join(__dirname, '..', '..', 'src')) || '.'

const migrationTemplate = () => `import { sql } from 'sql'
import { createMigrator } from '${root}/migrator'

export const up = createMigrator(
  async ({ db }) => {
  }
)

export const down = createMigrator(
  async ({ db }) => {
  }
)
`

const descriptorTemplate = (id, name) => `import { createMigration } from '${root}/migrator'
import { up, down } from './${id}_${name}'

export default createMigration({
  id: ${id},
  name: '${name}',
  up,
  down,
})
`

const uniqueTestRx = /^[0-9]+_(.+)\.ts$/i

module.exports = async (name) => {
  await fs.ensureDir(path.join('src', 'migrations'))

  const existingMigrations = await fs.readdir(path.join('src', 'migrations'))

  const uniqueTestMatches = existingMigrations.filter(x => {
    const match = uniqueTestRx.exec(x)
    return match && match[1] === name
  })

  if (uniqueTestMatches.length > 0) {
    throw new Error(`migration "${name}" conflicts with existing migrations:` + uniqueTestMatches.map(x => `\r\n  ${x}`).join())
  }

  const id = Date.now()

  const prefix = `${id}_${name}`

  const migrationFilename = path.join('src', 'migrations', `${prefix}.ts`)
  const descriptorFilename = path.join('src', 'migrations', `${prefix}.descriptor.ts`)

  const migration = migrationTemplate()
  const descriptor = descriptorTemplate(id, name)

  await fs.writeFile(descriptorFilename, descriptor, { encoding: 'utf8' })

  try {
    console.log(`created descriptor file ${descriptorFilename}`)

    await fs.writeFile(migrationFilename, migration, { encoding: 'utf8' })

    try {
      console.log(`created migration file ${migrationFilename}`)
    } catch (exc) {
      try {
        await fs.unlink(migrationFilename)
      } catch (exc2) {
        console.error(`Failed to clean migration file ${migrationFilename}`)
        console.error(exc2)
      }
      throw exc
    }
  } catch (exc) {
    try {
      await fs.unlink(descriptorFilename)
    } catch (exc2) {
      console.error(`Failed to clean migration descriptor file ${descriptorFilename}`)
      console.error(exc2)
    }
    throw exc
  }
}
