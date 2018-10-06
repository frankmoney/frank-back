import Migration from './Migration'

const loadMigration = (filename: string) => {
  const descriptor = `${filename.substr(0, filename.length - 3)}.migration.ts`
  const migration = <Migration>require(descriptor).migration
  return migration
}

export default loadMigration
