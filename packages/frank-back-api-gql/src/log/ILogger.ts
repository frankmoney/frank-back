import ILoggerScope from './ILoggerScope'

export default interface ILogger {
  createScope(name: string): ILoggerScope
}
