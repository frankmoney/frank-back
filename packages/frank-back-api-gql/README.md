## frank-back-api-gql

GraphQL backend server

#### Scripts
- `yarn start` - starts the server
- `yarn db up` - applies migrations to DB
- `yarn db seed` - populates empty DB with some test data
- `yarn gen migration <name>` - creates new migration
- `yarn lint` - runs linters
- `yarn lint-fix` - runs linters in write mode
- `yarn prettier` - runs prettier with `--list-different` flag
- `yarn prettier-fix` - runs prettier with `--write` flag

#### Environment Variables
- `PORT: number` - port to listen on
- `DATABASE: { host: string; database: string; user: string; password: string; setRole?: string; }` - DB connection  
- `MX_API_KEY: string`
- `MX_CLIENT_ID: string`
- `MAILGUN_DOMAIN: string`
- `MAILGUN_API_KEY: string`
- `SENTRY_DSN: string`
- `AUTHENTICATION_DISABLED: boolean` - if `true`, skips password checks
- `AUTHENTICATION_JWT_KEY: string` - key to use for auth JWT encoding
- `RESET_PASSWORD_TOKEN_TTL_MINUTES: minutes` - password reset token will be unusable after that much time
- `DEMO_ACCOUNT_SETTINGS: { name: string; description: string; currencyCode: string; sourceName: string; bankName: string; bankLogo: string; bankLink: string; balance: number; }`
- `MAIL_FROM: string`
- `MAIL_DEBUG_ADDRESS: string`
- `MAIL_LINK_BASE: string`
- `MAIL_USER_CREATION_CONFIRMATION_LINK: string`
- `MAIL_TEAM_MEMBER_INVITE_LINK: string`
- `MAIL_PASSWORD_RESET_REQUEST_LINK: string`
- `MAIL_ACCOUNT_CREATION_NOTIFICATION_LINK: string`
- `MAIL_ACCOUNT_AGGREGATION_ISSUES_LINK: string`
- `MAIL_STORY_PUBLICATION_NOTIFICATION_LINK: string`
