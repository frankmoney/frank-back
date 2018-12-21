import { URL } from 'url'
import { PoolConfig } from 'pg'
import { isNil } from 'ramda'
import env from './env'

const parseBoolString = (str: undefined | null | string): boolean =>
  str ? ['1', 't', 'true'].indexOf(str.toLowerCase()) >= 0 : false

const parseJsString = <T>(str: string) => {
  // tslint:disable-next-line:prefer-const no-unnecessary-initializer
  let result: any = undefined
  // tslint:disable-next-line:no-eval
  eval(`result = ${str}`)
  return <T>result
}

const createLinkBuilder = <T extends { [key: string]: string }>(
  pattern: string,
  tokens: T
): {
  pattern: string
  tokens: T
  (args: { [K in keyof T]: any }): string
} => {
  const tokenMap: { [token: string]: string } = {}

  Object.keys(tokens).forEach(name => {
    const token = tokens[name]
    tokenMap[token] = name
  })

  const linkBuilder = (args: T) =>
    pattern.replace(/@\((.+?)\)/g, (m, token) => {
      const name = tokenMap[token]
      const value = args[name]
      return isNil(value) ? '' : `${value}`
    })

  linkBuilder.pattern = pattern
  linkBuilder.tokens = tokens

  return linkBuilder
}

const buildMailConfig = () => {
  if (!env.MAIL_FROM || !env.MAIL_FROM.trim()) {
    throw new Error(
      `Invalid configuration: MAIL_LINK_BASE should be present and non-empty`
    )
  }

  if (!env.MAIL_LINK_BASE || !env.MAIL_LINK_BASE.trim()) {
    throw new Error(
      `Invalid configuration: MAIL_LINK_BASE should be present and non-empty`
    )
  }

  if (
    !env.MAIL_USER_CREATION_CONFIRMATION_LINK ||
    env.MAIL_USER_CREATION_CONFIRMATION_LINK.indexOf('@(TOKEN)') < 0
  ) {
    throw new Error(
      `Invalid configuration: MAIL_USER_CREATION_CONFIRMATION_LINK should be present and contain token "@(TOKEN)"; got: ${
        env.MAIL_USER_CREATION_CONFIRMATION_LINK
      }`
    )
  }

  if (
    !env.MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK ||
    env.MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK.indexOf('@(ACCOUNT_PID)') < 0
  ) {
    throw new Error(
      `Invalid configuration: MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK should be present and contain token "@(ACCOUNT_PID)"; got: ${
        env.MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK
      }`
    )
  }

  if (
    !env.MAIL_STORY_PUBLICATION_NOTIFICATION_LINK ||
    env.MAIL_STORY_PUBLICATION_NOTIFICATION_LINK.indexOf('@(STORY_PID)') < 0
  ) {
    throw new Error(
      `Invalid configuration: MAIL_STORY_PUBLICATION_NOTIFICATION_LINK should be present and contain token "@(STORY_PID)"; got: ${
        env.MAIL_STORY_PUBLICATION_NOTIFICATION_LINK
      }`
    )
  }

  const from = env.MAIL_FROM
  const linkBase = env.MAIL_LINK_BASE

  const buildLink = (link: string) => new URL(link, linkBase).toString()

  const result = {
    from,
    links: {
      base: linkBase,
      userCreationConfirmation: createLinkBuilder(
        buildLink(env.MAIL_USER_CREATION_CONFIRMATION_LINK),
        {
          token: 'TOKEN',
        }
      ),
      accountCreationNotification: createLinkBuilder(
        buildLink(env.MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK),
        {
          accountPid: 'ACCOUNT_PID',
        }
      ),
      storyPublicationNotification: createLinkBuilder(
        buildLink(env.MAIL_STORY_PUBLICATION_NOTIFICATION_LINK),
        {
          storyPid: 'STORY_PID',
        }
      ),
    },
  }

  return result
}

if (!env.AUTHENTICATION_JWT_KEY || !env.AUTHENTICATION_JWT_KEY.trim()) {
  throw new Error(
    'Invalid configuration: AUTHENTICATION_JWT_KEY should be set and not empty'
  )
}

const config = {
  DEBUG: env.DEBUG,
  PORT: Number(env.PORT),
  DATABASE: parseJsString<PoolConfig & { setRole?: string }>(env.DATABASE),
  MX_API_KEY: env.MX_API_KEY,
  MX_CLIENT_ID: env.MX_CLIENT_ID,
  MAILGUN_DOMAIN: env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: env.MAILGUN_API_KEY,
  SENTRY_DSN: env.SENTRY_DSN,
  AUTHENTICATION_DISABLED: parseBoolString(env.AUTHENTICATION_DISABLED),
  AUTHENTICATION_JWT_KEY: env.AUTHENTICATION_JWT_KEY,
  USER_COLORS: env.USER_COLORS
    ? env.USER_COLORS.split(',').map(x => Number(x))
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  MAIL: buildMailConfig(),
}

export type Config = typeof config

export default config
