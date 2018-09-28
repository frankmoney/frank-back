import Migration from './Migration'

const loadMigration = (filename: string) => {
  const descriptor = `${filename.substr(0, filename.length - 3)}.descriptor.ts`
  const migration = <Migration>require(descriptor).default
  return migration
}

export default loadMigration
