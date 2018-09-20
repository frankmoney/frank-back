import { MxUser, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import createLogger from 'utils/createLogger'

const LOGGER_PREFIX = 'app:onboarding:enterMfaChallenges'

export default async (
  onboarding: Onboarding,
  prisma: Prisma,
  challenges: any,
) => {
  const log = createLogger(LOGGER_PREFIX)

  log.debug('start')

  challenges = challenges.map((x: string) => JSON.parse(x))

  const existingMember = (await prisma.query.mxMembers(
    {
      where: {
        onboarding: { id: onboarding.id },
      },
    },
    '{id, mxGuid, institutionCode, user {id, mxGuid}}',
  ))[0]

  const r = await AtriumClient.resumeMemberAggregation({
    params: {
      userGuid: existingMember.user.mxGuid,
      memberGuid: existingMember.mxGuid,
    },
    body: { member: { challenges } },
  })
}
