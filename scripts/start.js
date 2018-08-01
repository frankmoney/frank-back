const path = require('path')
const tsNodePkg = require('ts-node/package.json')
const { envCmdAsync, spawnAsync } = require('./utils')

const tsNodeBin = path.join(
  path.dirname(require.resolve('ts-node/package.json')),
  tsNodePkg.bin['ts-node']
)

const genSchemaAsync = () => spawnAsync('node', 'scripts', 'gen', 'schema')

const startAsync = args =>
  envCmdAsync(
    '--no-override',
    'config.env',
    'node',
    '-r',
    'tsconfig-paths/register',
    tsNodeBin,
    '--pretty',
    'app',
    ...args
  )

module.exports = async (...args) => {
  await genSchemaAsync()
  await startAsync(args)
}
