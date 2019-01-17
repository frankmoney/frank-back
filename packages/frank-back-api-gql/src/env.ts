const env = {
  DEBUG: process.env.DEBUG!,
  PORT: process.env.PORT!,
  DATABASE: process.env.DATABASE!,
  MX_API_KEY: process.env.MX_API_KEY!,
  MX_CLIENT_ID: process.env.MX_CLIENT_ID!,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN!,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY!,
  USER_COLORS: process.env.USER_COLORS,
  SENTRY_DSN: process.env.SENTRY_DSN,
  AUTHENTICATION_DISABLED: process.env.AUTHENTICATION_DISABLED,
  AUTHENTICATION_JWT_KEY: process.env.AUTHENTICATION_JWT_KEY,
  RESET_PASSWORD_TOKEN_TTL_MINUTES:
    process.env.RESET_PASSWORD_TOKEN_TTL_MINUTES,
  DEMO_ACCOUNT_SETTINGS: process.env.DEMO_ACCOUNT_SETTINGS!,
  MAIL_FROM: process.env.MAIL_FROM!,
  MAIL_DEBUG_ADDRESS: process.env.MAIL_DEBUG_ADDRESS,
  MAIL_LINK_BASE: process.env.MAIL_LINK_BASE!,
  MAIL_USER_CREATION_CONFIRMATION_LINK: process.env
    .MAIL_USER_CREATION_CONFIRMATION_LINK!,
  MAIL_TEAM_MEMBER_INVITE_LINK: process.env.MAIL_TEAM_MEMBER_INVITE_LINK!,
  MAIL_PASSWORD_RESET_REQUEST_LINK: process.env
    .MAIL_PASSWORD_RESET_REQUEST_LINK!,
  MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK: process.env
    .MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK!,
  MAIL_ACCOUNT_AGGREGATION_ISSUES_LINK: process.env
    .MAIL_ACCOUNT_AGGREGATION_ISSUES_LINK!,
  MAIL_STORY_PUBLICATION_NOTIFICATION_LINK: process.env
    .MAIL_STORY_PUBLICATION_NOTIFICATION_LINK!,
}

export default env
