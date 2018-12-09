import Level from './Level'

export default interface IEvent {
  level: Level
  formatted: string
  format: any
  args: any[]
}
