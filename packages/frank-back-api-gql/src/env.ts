const env = {
  DEBUG: process.env.DEBUG!,
  PORT: process.env.PORT!,
  DATABASE: process.env.DATABASE!,
  MX_API_KEY: process.env.MX_API_KEY!,
  MX_CLIENT_ID: process.env.MX_CLIENT_ID!,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN!,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY!,
  USER_COLORS: process.env.USER_COLORS,
  SENTRY_DNS: process.env.SENTRY_DNS,
}

export default env
