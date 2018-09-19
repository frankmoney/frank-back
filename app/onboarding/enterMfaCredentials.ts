import { MxUser, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import createLogger from 'utils/createLogger'

const LOGGER_PREFIX = 'app:onboarding:enterMfaCredentials'

export default async (
  onboarding: Onboarding,
  prisma: Prisma,
  credentials: any,
) => {
  const log = createLogger(LOGGER_PREFIX)

  log.debug('start')

  credentials = credentials.map((x: string) => JSON.parse(x))

  const existingMember = (await prisma.query.mxMembers(
    {
      where: {
        onboarding: { id: onboarding.id },
      },
    },
    '{id, mxGuid, institutionCode, user {id, mxGuid}}',
  ))[0]

  log.debug(existingMember)

  const r = await AtriumClient.resumeMemberAggregation({
    params: {
      userGuid: existingMember.user.mxGuid,
      memberGuid: existingMember.mxGuid,
    },
    body: { member: { challenges: credentials } },
  })

  log.debug(r)
}
