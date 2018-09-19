import { Onboarding, Prisma } from 'app/graphql/generated/prisma'

export type StatusHandlerArg = {
  onboarding: Onboarding
  member: any
  memberGuid: string
  userGuid: string
  prisma: Prisma
}

export type StatusHandler = (arg: StatusHandlerArg) => Promise<Onboarding>
