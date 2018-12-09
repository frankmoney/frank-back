import Onboarding from 'store/types/Onboarding'
import getMemberById from 'api/dal/mx/getMemberById'
import OnboardingScope from './OnboardingScope'

const LOGGER_PREFIX = 'app:onboarding:enterMfaChallenges'

export default async (
  onboarding: Onboarding,
  scope: OnboardingScope,
  challenges: any
) => {
  const log = scope.logFor(LOGGER_PREFIX)

  log.trace('start')

  const existingMxMember = await getMemberById(
    { id: onboarding.mxMemberId },
    scope
  )

  if (existingMxMember) {
    await scope.mx.resumeMemberAggregation({
      userGuid: existingMxMember.mxUser.mxGuid,
      memberGuid: existingMxMember.mxGuid,
      member: {
        challenges,
      },
    })
  } else {
    // TOTO maybe exception?
    const m = `mx member not found`
    log.warn(m)
  }
}
