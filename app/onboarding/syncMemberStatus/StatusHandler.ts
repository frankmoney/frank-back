import { Onboarding, Prisma } from 'app/graphql/generated/prisma'

export type HandlerArg = {
  onboarding: Onboarding
  member: any
  memberGuid: string,
  userGuid: string
  prisma: Prisma
}

export type StatusHandler = (arg: HandlerArg) => Promise<Onboarding>