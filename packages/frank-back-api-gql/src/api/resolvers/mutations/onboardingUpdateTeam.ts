import { throwArgumentError } from 'api/errors/ArgumentError'
import { Json } from 'gql/index'
import { TEAM_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'
import { ACCOUNT_STEP } from 'api/onboarding/constants'

const onboardingUpdateTeam = createPrivateResolver(
  'Mutation:onboarding:updateTeam',
  async ({ scope, args: { members } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== TEAM_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      team: {
        members: members.map((x: string) => JSON.parse(x)),
      },
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingUpdateTeam: field
    .ofType(OnboardingType)
    .args(arg => ({
      members: arg.listOf(Json),
    }))
    .resolve(onboardingUpdateTeam),
}))
