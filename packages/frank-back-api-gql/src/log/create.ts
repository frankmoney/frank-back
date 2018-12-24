import { format } from 'util'
import DebugLogger from './DebugLogger'
import IEvent from './IEvent'
import Level from './Level'
import Log from './Log'
import SentryLogger from './SentryLogger'

const loggers = [new DebugLogger(), new SentryLogger()]

const createLog = (name: string): Log => {
  const scopes = loggers.map(x => x.createScope(name))

  const log = (level: Level, args: any[]) => {
    if (args[0] instanceof Error) {
      const error = args.shift()
      if (typeof args[0] === 'string') {
        args[0] += '\r\n%O'
      } else if (args.length > 1) {
        args.unshift('%O\r\n%O')
      } else {
        args.unshift('%O')
      }
      args.push(error)
    }

    const event: IEvent = {
      level,
      format: args[0],
      args: args.slice(1),
      formatted: format(args[0], ...args.slice(1)),
    }

    scopes.forEach(x => x.log(event))
  }

  return {
    trace: (...args: any[]) => log(Level.trace, args),
    debug: (...args: any[]) => log(Level.debug, args),
    info: (...args: any[]) => log(Level.info, args),
    warn: (...args: any[]) => log(Level.warn, args),
    error: (...args: any[]) => log(Level.error, args),
    fatal: (...args: any[]) => log(Level.fatal, args),
  }
}

export default createLog
