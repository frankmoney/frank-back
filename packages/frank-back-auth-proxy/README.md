## frank-back-auth-proxy

authentication and router for other backend services

#### Scripts

- `yarn start` - starts the server

#### Environment Variables

- `PORT: number` - port to listen on
- `DB_HOST: string`
- `DB_NAME: string`
- `DB_PORT: number`
- `DB_USER: string`
- `DB_PASS: string`
- `APOLLO_PORT: number` - GraphQL backend port
- `UPLOADER_PORT: number` - image processing server port
- `AUTHENTICATION_DISABLED: boolean` - if `true`, skips password checks and accepts plain email in JWT cookie
- `AUTHENTICATION_JWT_KEY: string` - key to use for auth JWT encoding
- `AUTHENTICATION_COOKIE: string` - name of the cookie containing JWT
- `AUTHENTICATION_COOKIE_TTL_MS: number`
