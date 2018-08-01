const spawn = require('cross-spawn')
const { EnvCmd } = require('env-cmd')

exports.spawnAsync = (command, ...args) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit' })
    proc.on('error', reject)
    proc.on(
      'exit',
      code =>
        code === 0 ? resolve() : reject(new Error(`Exit code: ${code}.`))
    )
  })

exports.envCmdAsync = (...args) =>
  new Promise((resolve, reject) => {
    const proc = EnvCmd(args)
    proc.on('error', reject)
    proc.on(
      'exit',
      code =>
        code === 0 ? resolve() : reject(new Error(`Exit code: ${code}.`))
    )
  })
