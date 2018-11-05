import { PoolConfig } from 'pg'
import env from './env'

const parseJsString = <T>(str: string) => {
  // tslint:disable-next-line:prefer-const no-unnecessary-initializer
  let result: any = undefined
  // tslint:disable-next-line:no-eval
  eval(`result = ${str}`)
  return <T>result
}

const config = {
  DEBUG: env.DEBUG,
  PORT: Number(env.PORT),
  DATABASE: parseJsString<PoolConfig & { setRole?: string }>(env.DATABASE),
  MX_API_KEY: env.MX_API_KEY,
  MX_CLIENT_ID: env.MX_CLIENT_ID,
  MAILGUN_DOMAIN: env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: env.MAILGUN_API_KEY,
  USER_COLORS: env.USER_COLORS
    ? env.USER_COLORS.split(',').map(x => Number(x))
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}

export default config
