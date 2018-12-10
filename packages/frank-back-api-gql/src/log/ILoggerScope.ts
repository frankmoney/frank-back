import IEvent from './IEvent'

export default interface ILoggerScope {
  readonly name: string
  log(event: IEvent): void
}
