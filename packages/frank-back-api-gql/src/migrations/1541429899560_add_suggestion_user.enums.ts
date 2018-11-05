export enum TeamMemberRole {
  observer = 1,
  manager = 2,
  administrator = 3,
}

export enum UserType {
  system = 1,
  person = 2,
}

export enum SystemUserName {
  migration = 'migration',
  system = 'system',
  import = 'import',
  suggestion = 'suggestion',
}

export const SystemUserId = {
  migration: 0,
  system: 0,
  import: 0,
  suggestion: 0,
}

export enum CurrencyCode {
  usd = 'USD',
  eur = 'EUR',
  rub = 'RUB',
}
