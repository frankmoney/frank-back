import { Prisma } from './graphql/generated/prisma'

export interface Context {
  prisma: Prisma
  user?: ContextUser
}

export type ContextUser = {
  id: string
  email: string
}
