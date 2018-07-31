const path = require('path')
const envcmd = require('env-cmd')
const tsNodePkg = require('ts-node/package.json')

const tsNodeBin = path.join(
  path.dirname(require.resolve('ts-node/package.json')),
  tsNodePkg.bin['ts-node']
)

module.exports = (...args) =>
  envcmd.EnvCmd([
    '--no-override',
    'config.env',
    'node',
    '-r',
    'tsconfig-paths/register',
    tsNodeBin,
    '--pretty',
    'app',
    ...args,
  ])
