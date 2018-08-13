const path = require('path')
const tsNodePkg = require('ts-node/package.json')
const { envCmdAsync } = require('../utils')

const tsNodeBin = path.join(
  path.dirname(require.resolve('ts-node/package.json')),
  tsNodePkg.bin['ts-node']
)

module.exports = async (...args) => {
  await envCmdAsync(
    'node',
    '-r',
    'tsconfig-paths/register',
    tsNodeBin,
    '--pretty',
    path.join('scripts', 'migrations', 'up.ts')
  )
}
