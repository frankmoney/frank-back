import { Prisma } from './graphql/generated/prisma'

// tslint:disable-next-line:interface-name
export interface Context {
  prisma: Prisma
  user?: ContextUser
}

export type ContextUser = {
  id: string
  email: string
}
