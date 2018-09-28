import debug from 'debug'

export type Logger = {
  trace(formatter: any, ...args: any[]): void
  debug(formatter: any, ...args: any[]): void
  info(formatter: any, ...args: any[]): void
  warn(formatter: any, ...args: any[]): void
  error(formatter: any, ...args: any[]): void
  fatal(formatter: any, ...args: any[]): void
}

const createLogger = (name: string) => ({
  trace: debug(`${name}:trace`),
  debug: debug(`${name}:debug`),
  info: debug(`${name}:info`),
  warn: debug(`${name}:warn`),
  error: debug(`${name}:error`),
  fatal: debug(`${name}:fatal`),
})

export default createLogger
