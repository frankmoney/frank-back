import fs from 'fs-extra'
import path from 'path'
import Migration from './Migration'
import loadMigration from './loadMigration'

const validate = async (appliedMigrations: { id: number, name: string }[]) => {
  const existingMigrations = []

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

  appliedMigrations.sort((a, b) => a.id - b.id)
  existingMigrations.sort((a, b) => a.id - b.id)

  const missingAppliedMigrations: { id: number, name: string }[] = []
  const missingExistingMigrations: { id: number, name: string }[] = []

  let i = 0
  let j = 0
  const ii = appliedMigrations.length
  const jj = existingMigrations.length
  while (i < ii && j < jj) {
    let appliedMigration = appliedMigrations[i]
    let existingMigration = existingMigrations[j]

    if (appliedMigration.id === existingMigration.id) {
      ++i
      ++j
    } else if (appliedMigration.id < existingMigration.id) {
      do {
        missingExistingMigrations.push(appliedMigration)
        appliedMigration = appliedMigrations[++i]
      } while (appliedMigration && appliedMigration.id < existingMigration.id)
    } else if (existingMigration.id < appliedMigration.id) {
      do {
        missingAppliedMigrations.push(existingMigration)
        existingMigration = existingMigrations[++j]
      } while (existingMigration && existingMigration.id < appliedMigration.id)
    }
  }

  while (i < ii) {
    missingExistingMigrations.push(appliedMigrations[i++])
  }

  const remainingExistingMigrations: Migration[] = []
  while (j < jj) {
    remainingExistingMigrations.push(existingMigrations[j++])
  }

  return {
    appliedMigrations,
    existingMigrations,
    missingAppliedMigrations,
    missingExistingMigrations,
    remainingExistingMigrations,
  }
}

export default validate
