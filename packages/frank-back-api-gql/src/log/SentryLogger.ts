import ILogger from './ILogger'
import SentryLoggerScope from './SentryLoggerScope'

export default class SentryLogger implements ILogger {
  public createScope(name: string) {
    return new SentryLoggerScope(name)
  }
}
