import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { TEAM_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingUpdateTeam = createPrivateResolver(
  'Mutation:onboarding:updateTeam',
  async ({ scope, args: { members } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (!existingOnboarding || existingOnboarding.step !== TEAM_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          team: {
            members: members.map((x: string) => JSON.parse(x)),
          },
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  onboardingUpdateTeam: field
    .ofType(OnboardingType)
    .args(arg => ({
      members: arg.listOf(Json),
    }))
    .resolve(onboardingUpdateTeam),
}))
