import debug from 'debug'

const createLog = (name: string) => ({
  trace: debug(`${name}:trace`),
  debug: debug(`${name}:debug`),
  info: debug(`${name}:info`),
  warn: debug(`${name}:warn`),
  error: debug(`${name}:error`),
  fatal: debug(`${name}:fatal`),
})

export default createLog
