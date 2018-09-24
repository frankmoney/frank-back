const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const packageJson = require('../package.json')
const typescriptPackageJson = require('typescript/package.json')

const typescriptPackageJsonPath = require.resolve('typescript/package.json')
const tscPath = path.join(
  path.dirname(typescriptPackageJsonPath),
  typescriptPackageJson.bin.tsc
)
const sourcePath = path.dirname(require.resolve('../lib/types.ts'))
const buildPath = path.relative('.', path.join(__dirname, '../build'))

module.exports = async () => {
  console.log(`building package into ${buildPath}`) // tslint:disable-line:no-console

  try {
    await fs.emptyDir(buildPath)
  } catch (exc) {
    throw new Error(`Failed to ensure empty build path ${buildPath}\r\n${exc}`)
  }

  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    await execa('node', [tscPath, '-p', 'tsconfig.json'], { stdio: 'inherit' })
  } catch (exc) {
    throw new Error(
      `Failed to compile TypeScript files into ${buildPath} from ${sourcePath}\r\n${exc}`
    )
  }

  try {
    const newPackageJson = {
      ...packageJson,
      private: false,
    }

    await fs.writeJson(path.join(buildPath, 'package.json'), newPackageJson, {
      spaces: 2,
    })
  } catch (exc) {
    throw new Error(
      `Failed to write package.json into ${buildPath} from ${packageJsonPath}\r\n${exc}`
    )
  }
}
