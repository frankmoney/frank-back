type Log = {
  trace(formatter: any, ...args: any[]): void
  debug(formatter: any, ...args: any[]): void
  info(formatter: any, ...args: any[]): void
  warn(formatter: any, ...args: any[]): void
  error(formatter: any, ...args: any[]): void
  fatal(formatter: any, ...args: any[]): void
}

export default Log
