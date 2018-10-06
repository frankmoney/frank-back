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
  DATABASE: parseJsString<PoolConfig>(env.DATABASE),
  MX_API_KEY: env.MX_API_KEY,
  MX_CLIENT_ID: env.MX_CLIENT_ID,
  MAILGUN_DOMAIN: env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: env.MAILGUN_API_KEY,
}

export default config
