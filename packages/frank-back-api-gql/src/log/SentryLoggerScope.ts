import { captureException } from '@sentry/node'
import IEvent from './IEvent'
import ILoggerScope from './ILoggerScope'
import Level from './Level'

export default class SentryLoggerScope implements ILoggerScope {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  public log({ level, format, args }: IEvent) {
    if (level > Level.info) {
      if (format instanceof Error) {
        captureException(format)
      }

      args.filter(x => x instanceof Error).forEach(x => captureException(x))
    }
  }
}
