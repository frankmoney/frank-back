const path = require('path')
const tsNodePkg = require('ts-node/package.json')
const { envCmdAsync, spawnAsync } = require('./utils')

const tsNodeBin = path.join(
  path.dirname(require.resolve('ts-node/package.json')),
  tsNodePkg.bin['ts-node']
)

const startAsync = args =>
  envCmdAsync(
    'node',
    '-r',
    'tsconfig-paths/register',
    tsNodeBin,
    '--pretty',
    'demo-server.ts',
    ...args
  )

module.exports = async (...args) => {
  await startAsync(args)
}
