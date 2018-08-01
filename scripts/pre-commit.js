const path = require('path')
const prettierPkg = require('prettier/package')
const tslintPkg = require('tslint/package')
const { spawnAsync } = require('./utils')

const prettierBin = path.join(
  path.dirname(require.resolve('prettier/package')),
  prettierPkg.bin
)

const tslintBin = path.join(
  path.dirname(require.resolve('tslint/package')),
  tslintPkg.bin.tslint
)

module.exports = async (...files) => {
  await spawnAsync(
    'node',
    prettierBin,
    '--config',
    path.join(__dirname, '..', '.prettierrc'),
    '--write',
    ...files
  )

  await spawnAsync('node', 'scripts', 'gen', 'schema')

  await spawnAsync('node', tslintBin, '-p', path.join(__dirname, '..'))

  await spawnAsync('git', 'add', ...files)
}
