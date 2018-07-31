import { Prisma } from './graphql/generated/prisma'

export interface Context {
  prisma: Prisma,
}
