export default interface Log {
  trace(formatter: string, ...args: any[]): void
  trace(error: Error, formatter: string, ...args: any[]): void

  debug(formatter: string, ...args: any[]): void
  debug(error: Error, formatter: string, ...args: any[]): void

  info(formatter: string, ...args: any[]): void
  info(error: Error, formatter: string, ...args: any[]): void

  warn(formatter: string, ...args: any[]): void
  warn(error: Error, formatter: string, ...args: any[]): void

  error(formatter: string, ...args: any[]): void
  error(error: Error, formatter: string, ...args: any[]): void

  fatal(formatter: string, ...args: any[]): void
  fatal(error: Error, formatter: string, ...args: any[]): void
}
