import config from 'config'
import migrate from './migrate'

let to: undefined | string

for (let i = 0, ii = process.argv.length; i < ii; ++i) {
  const arg = process.argv[i]
  if (arg[0] === '-') {
    if (arg === '-t') {
      if (i + 1 < ii && /^[+\-]?[0-9]+$/.test(process.argv[i + 1])) {
        to = process.argv[++i]
      } else {
        throw new Error(`-t should be followed by migration id or delta`)
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
}

const databaseConfig = config.DATABASE

migrate({ databaseConfig, to })
