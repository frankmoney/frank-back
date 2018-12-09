import debug from 'debug'
import IEvent from './IEvent'
import Level from './Level'
import ILoggerScope from './ILoggerScope'

type LogFn = (formatter: any, ...args: any[]) => void

export default class DebugLoggerScope implements ILoggerScope {
  public readonly name: string
  public readonly logs: { [level: number]: LogFn }

  public constructor(name: string) {
    this.name = name

    this.logs = {
      [Level.trace]: debug(`${this.name}:trace`),
      [Level.debug]: debug(`${this.name}:debug`),
      [Level.info]: debug(`${this.name}:info`),
      [Level.warn]: debug(`${this.name}:warn`),
      [Level.error]: debug(`${this.name}:error`),
      [Level.fatal]: debug(`${this.name}:fatal`),
    }
  }

  public log({ level, formatted }: IEvent) {
    const log = this.logs[level]
    if (log) {
      log(formatted)
    }
  }
}
