import DebugLoggerScope from './DebugLoggerScope'
import ILogger from './ILogger'

export default class DebugLogger implements ILogger {
  public createScope(name: string) {
    return new DebugLoggerScope(name)
  }
}
