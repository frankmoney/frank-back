import { Onboarding, Prisma } from 'app/graphql/generated/prisma'

export interface HandlerInterface {
  onboarding: Onboarding
  member: any
  memberGuid: string,
  userGuid: string
  prisma: Prisma
}
