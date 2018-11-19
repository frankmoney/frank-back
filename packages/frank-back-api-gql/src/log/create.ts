import debug from 'debug'
import Log from './Log'

const createLog = (name: string): Log => ({
  trace: debug(`${name}:trace`),
  debug: debug(`${name}:debug`),
  info: debug(`${name}:info`),
  warn: debug(`${name}:warn`),
  error: debug(`${name}:error`),
  fatal: debug(`${name}:fatal`),
})

export default createLog
