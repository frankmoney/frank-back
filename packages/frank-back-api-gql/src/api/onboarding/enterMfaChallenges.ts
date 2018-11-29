import Onboarding from 'store/types/Onboarding'
import getMemberById from 'api/dal/mx/getMemberById'
import OnboardingScope from './OnboardingScope'

const LOGGER_PREFIX = 'app:onboarding:enterMfaChallenges'

export default async (
  onboarding: Onboarding,
  scope: OnboardingScope,
  challengesJson: string[]
) => {
  const log = scope.logFor(LOGGER_PREFIX)

  log.debug('start')

  const challenges = challengesJson.map(x => JSON.parse(x))

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
    log.debug("don't have member")
  }
}
