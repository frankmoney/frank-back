const path = require('path')
const prismaPkg = require('prisma/package')
const { envCmdAsync } = require('../utils')

const prismaBin = path.join(
  path.dirname(require.resolve('prisma/package')),
  prismaPkg.bin.prisma
)

module.exports = async (...args) => {
  await envCmdAsync('node', prismaBin, 'deploy', ...args)
}
