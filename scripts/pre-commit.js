const path = require('path')
const spawn = require('cross-spawn')

const spawnAsync = (command, ...args) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit' })
    proc.on('error', reject)
    proc.on(
      'exit',
      code =>
        code === 0 ? resolve() : reject(new Error(`Exit code: ${code}.`))
    )
  })
module.exports = async (...files) => {
  try {
    await spawnAsync(
      'node',
      'node_modules/prettier/bin-prettier.js',
      '--config',
      path.join(__dirname, '..', '.prettierrc'),
      '--write',
      ...files
    )

    await spawnAsync('node', 'scripts', 'gen', 'schema')

    await spawnAsync(
      'node',
      'node_modules/tslint/bin/tslint',
      '-p',
      path.join(__dirname, '..')
    )

    await spawnAsync('git', 'add', ...files)
  } catch (exc) {
    console.error(exc)
    process.exit(1)
  }
}
